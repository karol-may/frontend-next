import {createClient} from "@/utils/supabase/client";
import {Teacher} from "@/types/Teacher";

// Controller
export interface TeachersControllerInterface
{
  teachers: Teacher[] | null;
  error: Error | null;
}


// CRUD - CREATE READ UPDATE DELETE

// LIST — Listowanie nauczycieli z filtrami.
export async function fetchTeachers(
    city: string,
    online: boolean,
    studentsLocation: boolean,
    teachersLocation: boolean,
    nameSearchQuery: string
): Promise<TeachersControllerInterface>
  {
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

  const {data : teachers, error} = await query;
  return {teachers, error};
}

// READ (SHOW) — Wyświetlenie danych danego nauczyciela
export async function fetchTeacher(userId: string) : Promise<TeachersControllerInterface>
{
  const supabase = createClient();

  const query = supabase
    .from("teachers")
    .select("*")
    .eq("user", userId);

  const {data : teachers, error} = await query;
  return {teachers, error};
}

// UPDATE — Aktualizacja danych nauczyciela
export async function updateTeacher(teacher: Teacher): Promise<TeachersControllerInterface>
{
  const supabase = createClient();
  const query = supabase
    .from('teachers')
    .update(teacher)
    .eq('id', teacher.id)
    .select();

  const {data : teachers, error} = await query;
  return {teachers, error};
}