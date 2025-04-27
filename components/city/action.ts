import {City} from "@/types/City";
import {createClient} from "@/utils/supabase/client";

export interface CitiesControllerInterface {
    data: City[] | null;
    error: Error | null;
}

//CRUD
export async function fetchCities(): Promise<CitiesControllerInterface> {
    const supabase = createClient();

    const query = supabase
        .from('cities')
        .select('*')

    const {data, error} = await query;
    return {data, error};
}
export async function fetchCity(id: string): Promise<CitiesControllerInterface> {
    const supabase = createClient();

    const query = supabase
        .from('cities')
        .select('*')
        .eq('id', id)

    const {data, error} = await query;
    return {data, error};
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