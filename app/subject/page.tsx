"use client";
import {addSubject, fetchSubjects } from "@/components/subject/action";
import { useEffect, useState } from "react";
import { Subject } from "@/types/Subject";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Select, SelectItem} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";


export default function SubjectPage()   {
    const [subjects, setSubjects] = useState<Subject[]|null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [formMode, setFormMode] = useState<"add"|"edit"|null>(null);
    const [formData, setFormData] = useState<FormData|null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        fetchSubjects()
            .then(({ data, error }) => {
                if (error) {
                    setError(error);
                } else {
                    setSubjects(data);
                    setError(null); // Czyszczenie błędu, jeśli zapytanie się powiodło
                }
            })
            .catch(otherError => setError(otherError)); // Obsługa nieoczekiwanych błędów
    }, []);
  
    function handleSubjectSubmit(data: any) {
        addSubject(data).then().catch(otherError => setError(null));
    }

    return (
        <>
            <p>{error?.message }</p>
            {formMode === "add" && (
                <form className={"flex flex-col space-y-4"} onSubmit={handleSubmit(handleSubjectSubmit)}>
                    <Label>Nazwa miasta</Label>
                    <Input {...register("name", { required: true })} />
                </form>


            ):(

    {formMode === "edit" && (
        <form className={"flex flex-col space-y-4"} onSubmit={handleSubmit(handleSubjectSubmit)}>
            <Label>Nazwa miasta</Label>
            <Input {...register("name", { required: true })} />
            <Label>Status</Label>
            <Switch {...register("status",)}>
            <Button type={"submit"} className={""}>Dodaj Miasto</Button>
        </form>

            }
                <div className="flex flex-col space-y-4">
                    <Button className={"block"} onClick={()=>setFormMode(!formMode)}>Dodaj Miasto</Button>
                    <Table>
                        <TableCaption>Lista przedmiotów obsługiwanych przez system.</TableCaption>
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
                                subjects?.map((subject, index)=> {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{subject.name}</TableCell>
                                            <TableCell>{subject.status?"🟢":"🔴"}</TableCell>
                                            <TableCell className="text-right">{subject.teachersNo}</TableCell>
                                            <TableCell className="text-right">{subject.studentsNo}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            )}

        </>
    );
}