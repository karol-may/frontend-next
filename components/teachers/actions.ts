import {createClient} from "@/utils/supabase/client";
import {Teacher} from "@/types/Teacher";

interface TeachersControllerResponse {
  data: Teacher[] | null;
  error: Error | null;
}


// Controller

// CRUD - CREATE READ UPDATE DELETE

// LIST — Listowanie nauczycieli z filtrami.
/*
 * @return {data: Teachers[], error: Error}
 */
export async function fetchTeachers(
  city: string,
  online: boolean,
  studentsLocation: boolean,
  teachersLocation: boolean,
  nameSearchQuery: string
): Promise<TeachersControllerResponse> {
  const supabase = createClient();

  let query = supabase.from("teachers").select("*");

  if (city && city !== "Wszystkie") {
    query = query.eq("city", city)
  }

  if (online) {
    query = query.eq("online", true);
  }

  if (studentsLocation) {
    query = query.eq("students_location", true);
  }

  if (teachersLocation) {
    query = query.eq("teachers_location", true);
  }

  if (nameSearchQuery) {
    query = query.or('name.ilike."%' + nameSearchQuery + '%", surname.ilike."%' + nameSearchQuery + '%"')
  }

  query = query
    .order("name", {ascending: true})
    .order("surname", {ascending: true})

  const {data, error} = await query;

  if (error) {
    console.error("Error fetching teachers:", error);
    return {data: null, error};
  }

  return {data, error: null};
}

// READ (SHOW) — Wyświetlenie danych danego nauczyciela
export async function fetchTeacher(
  userId: string
): Promise<TeachersControllerResponse> {
  const supabase = createClient();

  const query = supabase
    .from("teachers")
    .select("*")
    .eq("user", userId);

  const {data, error} = await query;


  if (error) {
    console.error("Error fetching teachers:", error);
    return {data: null, error};
  }

  return {data, error: null};
}

// UPDATE — Aktualizacja danych nauczyciela
export async function updateTeacher(teacher : Teacher):Promise<TeachersControllerResponse> {
  const supabase = createClient();
  const query = supabase
    .from('teachers')
    .update({...teacher})
    .eq('id', teacher.id)
    .select()

  const {data, error} = await query;


  if (error) {
    console.error("Error fetching teachers:", error);
    return {data: null, error};
  }

  return {data, error: null};

}