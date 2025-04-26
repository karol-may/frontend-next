import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

export default function SubjectPage()   {
    return (
        <>

            <Table>
                <TableCaption>Przedmioty dostępne do nauki </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Przedmiot</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ilość nauczycieli</TableHead>
                        <TableHead className="text-right">Ilość uczniów</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Matematyka</TableCell>
                        <TableCell>Dostępne</TableCell>
                        <TableCell>32</TableCell>
                        <TableCell className="text-right">174</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Programowanie</TableCell>
                        <TableCell>Niedostępne</TableCell>
                        <TableCell>0 (aktualnie na strajku)</TableCell>
                        <TableCell className="text-right">2</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Język Angielski</TableCell>
                        <TableCell>Dostępne</TableCell>
                        <TableCell>27</TableCell>
                        <TableCell className="text-right">142</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </>
    );
}