
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

let subjects = [
    {
        przedmiot: "Matematyka",
        status: true,
        iloscNauczycieli: 32,
        iloscUczniow: 174
    },
    {
        przedmiot: "Programowanie",
        status: false,
        iloscNauczycieli: "0",
        iloscUczniow: 2
    },
    {
        przedmiot: "Język Angielski",
        status: true,
        iloscNauczycieli: 27,
        iloscUczniow: 142
    }
];

export default function SubjectPage()   {
    return (
        <>

            <Table>
                <TableCaption>Informacje o dostępnych na stronie przedmiotach</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Przedmiot</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ilość nauczycieli</TableHead>
                        <TableHead className="text-right">Ilość uczniów</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { subjects.map((subject, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{subject.przedmiot}</TableCell>
                            <TableCell>{subject.status?"Dostępne":"Strajk"}</TableCell>
                            <TableCell>{subject.iloscNauczycieli}</TableCell>
                            <TableCell className="text-right">{subject.iloscUczniow}</TableCell>
                        </TableRow>
                    ))}


                </TableBody>
            </Table>

        </>
    );
}