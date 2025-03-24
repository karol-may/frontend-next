// import {Subject} from "@/types/Subject";
// import {City} from "@/types/City";

export type Teacher = {
  description: string;
  id: string;
  name: string;
  surname: string;
  city: string;
  subjects: undefined;
  online: boolean;
  teachers_location: boolean;
  students_location: boolean;
};


export function formDataToTeacherConverter(formData: FormData): Teacher  {
  return {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    city: formData.get("city") as string,
    subjects: undefined,
    description: formData.get("description") as string,
    online: formData.get("online") === "true", // Konwersja string -> boolean // TODO : W bazie zapisuje się NULL zamiast FALSE
    students_location: formData.get("students_location") === "true", // Konwersja string -> boolean // TODO : W bazie zapisuje się NULL zamiast FALSE
    teachers_location: formData.get("teachers_location") === "true", // Konwersja string -> boolean // TODO : W bazie zapisuje się NULL zamiast FALSE
  };
}