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


}

export default function SubjectPage()   {
    const [subjects, setSubjects] = useState<Subject[]|null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
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

            <Table>
                <TableCaption>Informacje o dostępnych na stronie przedmiotach.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ilość nauczycieli</TableHead>
                        <TableHead className="text-right">Ilość uczniów</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { subjects?.map((subject, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{subject.name}</TableCell>
                            <TableCell>{subject.status?"Dostępne":"Strajk"}</TableCell>
                            <TableCell>{subject.teachersNo}</TableCell>
                            <TableCell className="text-right">{subject.studentsNo}</TableCell>
                        </TableRow>
                    ))}


                </TableBody>
            </Table>

        </>
    );
}