import { login, signup } from './actions'
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";

export default function LoginPage() {
    return (
            <Card className={"md:w-4/12 w-12/12"}>
                <form>
                    <CardHeader>Zaloguj sie</CardHeader>
                    <CardContent>

                            <Label htmlFor="email">Email:</Label>
                            <Input id="email" name="email" type="email" required />
                            <Label htmlFor="password">Password:</Label>
                            <Input id="password" name="password" type="password" required />


                    </CardContent>
                    <CardFooter className={"flex flex-col space-y-2"}>
                        <Button className={"w-full bg-blue-500"} formAction={login}>Log in</Button>
                        <Button className={"w-full bg-green-500"} formAction={signup}>Create account</Button>
                    </CardFooter>
                </form>
            </Card>
    )
}