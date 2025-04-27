import {City} from "@/types/City";
import {createClient} from "@/utils/supabase/client";

export interface CitiesControllerInterface {
    id: string;
    name: string;
    status: boolean;
    teachersNo: number;
    studentsNo: number;
}

//CRUD
export function fetchCity(id:string) : Promise<CitiesControllerInterface>
{

}

export async function addCity(city : City) : Promise<CitiesControllerInterface>
{
    const supabase = createClient();

    const query = supabase
        .from('city')
        .insert([
            city as City,
        ])
        .select()

    const {data, error} = await query;
    return {data, error};
}

export async function updateCity(city: City): Promise<CitiesControllerInterface> {
    const supabase = createClient();

    const query = supabase
        .from('city')
        .update([
            city as City,
        ])
        .eq('id', city.id)
        .select()

    const {data, error} = await query;
    return {data, error};
}

export async function removeCity(city : City) : Promise<CitiesControllerInterface>
{
    const supabase = createClient();

    const query = supabase
        .from('cities')
        .delete()
        .eq('id', city.id)
        .select()

    const {data, error} = await query;
    return {data, error};
}