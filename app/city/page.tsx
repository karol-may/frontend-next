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

    let cities = [
        {
            miasto: "Łódź",
            status: false,
            liczbaNauczycieli: 18,
            liczbaUczniow: 68
        },
        {
            miasto: "Poznań",
            status: false,
            liczbaNauczycieli: 16,
            liczbaUczniow: 52
        },
        {
            miasto: "Wyszków",
            status: true,
            liczbaNauczycieli: 5,
            liczbaUczniow: 29
        },
        {
            miasto: "Warszawa",
            status: true,
            liczbaNauczycieli: 23,
            liczbaUczniow: 71.5
        }
]

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
                    {
                        cities.map((city, index)=> {
                           return (
                               <TableRow key={index}>
                                   <TableCell className="font-medium">{city.miasto}</TableCell>
                                   <TableCell>{city.status?"🟢":"🔴"}</TableCell>
                                   <TableCell className="text-right">{city.liczbaNauczycieli}</TableCell>
                                   <TableCell className="text-right">{city.liczbaUczniow}</TableCell>
                               </TableRow>
                           )
                        })
                    }
                </TableBody>
            </Table>
        </>
    )
}