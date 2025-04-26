'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { fetchTeacher } from "@/components/teachers/actions";

export async function login(formData: FormData) {
    const supabase = await createClient(cookies())

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: {user}, error } = await supabase.auth.signInWithPassword(data)

    if (user) {
        const teacher = await fetchTeacher(user.id);
        console.log("===================================================")
        console.log(teacher)
    } else {
        redirect('/teacher/create')
    }

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient(cookies())

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signUpAsStudent(formData: FormData) {
    await signup(formData)
}

export async function signUpAsTeacher(formData: FormData) {
    await signup(formData)
}