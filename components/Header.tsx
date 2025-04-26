"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/auth-js";
import {CircleUser, LogOutIcon} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

function Header() {
    const [user, setUser] = useState<User|null>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient(); // Tworzymy instancję Supabase wewnątrz komponentu
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
        };

        fetchUser();
    }, []);

    const signOut = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (!error) {
            router.push("/login"); // Zamiast redirect używamy push()
        }
    };

    return (
        <header className="flex justify-center w-screen dark:text-white text-white dark:bg-blue-800 bg-blue-500 p-4 space-x-4">
            <div className={"w-8/12 flex justify-between"}>
            <div className={"space-x-2"}>
              <Link className={`link ${pathname === "/teachers" ? "active" : ""}`} href="/teachers">
                Teachers
              </Link>
            <Link className={`link ${pathname === "/profile" ? "active" : ""}`} href="/profile">
                Profile
            </Link>
            <Link className={`link ${pathname === "/courses" ? "active" : ""}`} href="/courses">
                Courses
            </Link>
                <Link className={`link ${pathname === "/subject" ? "active" : ""}`} href="/subject">
                    Subjects
                </Link>
                <Link className={`link ${pathname === "/city" ? "active" : ""}`} href="/city">
                    City
                </Link>
            </div>
            <div>
            <ModeToggle />

            {!user ? (
                <Link className={`link ${pathname === "/login" ? "active" : ""}`} href="/login">
                    Login
                </Link>
            ) : (
            <DropdownMenu>
                <DropdownMenuTrigger><CircleUser /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href="/profile">
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut}><LogOutIcon />Wyloguj</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            )}
            </div>
            </div>
        </header>
    );
}

export default Header;
