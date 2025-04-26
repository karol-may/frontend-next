
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
        name: "Matematyka",
        status: true,
        teachersNo: 32,
        studentsNo: 174
    },
    {
        name: "Programowanie",
        status: false,
        teachersNo: "0",
        studentsNo: 2
    },
    {
        name: "Język Angielski",
        status: true,
        teachersNo: 27,
        studentsNo: 142
    }
];

export default function SubjectPage()   {
    return (
        <>

            <Table>
                <TableCaption>Informacje o dostępnych na stronie nameach</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ilość nauczycieli</TableHead>
                        <TableHead className="text-right">Ilość uczniów</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { subjects.map((subject, index) => (
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