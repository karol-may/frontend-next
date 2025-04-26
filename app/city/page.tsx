import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function CityPage() {


    return (
        <>
            <Table>
                <TableCaption>Lista miast obsługiwanych przez system.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Miasto</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Liczba Nauczycieli</TableHead>
                        <TableHead className="text-right">Liczba Uczniów</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Łódź</TableCell>
                        <TableCell>🔴</TableCell>
                        <TableCell className="text-right">18</TableCell>
                        <TableCell className="text-right">68</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Poznań</TableCell>
                        <TableCell>🔴</TableCell>
                        <TableCell className="text-right">16</TableCell>
                        <TableCell className="text-right">52</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Wyszków</TableCell>
                        <TableCell>🟢</TableCell>
                        <TableCell className="text-right">5</TableCell>
                        <TableCell className="text-right">29</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Warszawa</TableCell>
                        <TableCell>🟢</TableCell>
                        <TableCell className="text-right">23</TableCell>
                        <TableCell className="text-right">71,5</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}