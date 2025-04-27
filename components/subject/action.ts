import {createClient} from "@/utils/supabase/client";
import {Subject} from "@/types/Subject";

export interface SubjectsControllerInterface {
    data: Subject[] | null;
    error: Error | null;
}

//CRUD
export async function fetchSubjects(): Promise<SubjectsControllerInterface> {
    const supabase = createClient();

    const query = supabase
        .from('subjects')
        .select('*')

    const {data, error} = await query;
    return {data, error};
}


export async function fetchSubject(id: string): Promise<SubjectsControllerInterface> {
    const supabase = createClient();

    const query = supabase
        .from('subjects')
        .select('*')
        .eq('id', id)

    const {data, error} = await query;
    return {data, error};
}

export async function addSubject(subject : Subject) : Promise<SubjectsControllerInterface>
{
    const supabase = createClient();

    const query = supabase
        .from('subjects')
        .insert([
            subject as Subject,
        ])
        .select()

    const {data, error} = await query;
    return {data, error};
}

export async function updateSubject(subject: Subject): Promise<SubjectsControllerInterface> {
    const supabase = createClient();

    const query = supabase
        .from('subjects')
        .update([
            subject as Subject,
        ])
        .eq('id', subject.id)
        .select()

    const {data, error} = await query;
    return {data, error};
}

export async function removeSubject(subject : Subject) : Promise<SubjectsControllerInterface>
{
    const supabase = createClient();

    const query = supabase
        .from('subjects')
        .delete()
        .eq('id', subject.id)
        .select()

    const {data, error} = await query;
    return {data, error};
}