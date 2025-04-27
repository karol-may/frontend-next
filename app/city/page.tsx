"use client";
import {addCity, fetchCities } from "@/components/city/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { City } from "@/types/City";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

export default function CityPage() {
    const [cities, setCities] = useState<City[]|null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData|null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        fetchCities()
            .then(
                ({ data, error }) => {
                if (error) {
                    setError(error);
                } else {
                    setCities(data);
                    setError(null); // Czyszczenie błędu, jeśli zapytanie się powiodło
                }
            })
            .catch(otherError => setError(otherError)); // Obsługa nieoczekiwanych błędów
    }, []);


    function handleCitySubmit(data: any) {
        addCity(data).then().catch(otherError => setError(null));
    }

    return (
        <>
            <p>{error?.message }</p>
            {editMode ? (
                <form className={"flex flex-col space-y-4"} onSubmit={handleSubmit(handleCitySubmit)}>
                    <Label>Nazwa miasta</Label>
                    <Input {...register("name", { required: true })} />
                    <Button type={"submit"} className={""}>Dodaj Miasto</Button>
                </form>
                ):(
                <div className="flex flex-col space-y-4">
                    <Button className={"block"} onClick={()=>setEditMode(!editMode)}>Dodaj Miasto</Button>
                    <Table>
                        <TableCaption>Lista miast obsługiwanych przez system.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Nazwa</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Liczba Nauczycieli</TableHead>
                                <TableHead className="text-right">Liczba Uczniów</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                cities?.map((city, index)=> {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{city.name}</TableCell>
                                            <TableCell>{city.status?"🟢":"🔴"}</TableCell>
                                            <TableCell className="text-right">{city.teachersNo}</TableCell>
                                            <TableCell className="text-right">{city.studentsNo}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            )}






        </>
    )
}