"use client";
import {createClient} from "@/utils/supabase/client";

import {useEffect, useState} from "react";
import {User} from "@supabase/auth-js";
import {formDataToTeacherConverter, Teacher} from "@/types/Teacher";
import {fetchTeacher, updateTeacher} from "@/components/teachers/actions";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";

function ProfilePage() {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>()
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const {data} = await supabase.auth.getUser();
      setUser(data?.user || null);
    })();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchTeacher(user?.id)
        .then(response => {
          if (response.error) {
            setError(response.error.message)
          }
          if (response.teachers) {
            setTeacher(response.teachers[0])
          }
        })
        .catch((error: Error)=>{
          setError(error.message);
        })
    } else {
      setError("Nie ma tu jeszcze ID")
    }
  }, [user]);


  function toggleTeacherBooleanParameter(propertyToToggle: ("online"|"teachers_location"|"students_location")) {
    setTeacher(prevTeacher => ({
      ...prevTeacher,
      [propertyToToggle]: !prevTeacher?.[propertyToToggle]
    }) as Teacher);
  }

  function updateTeacherProxy(formData:FormData):void {

    const teacher = formDataToTeacherConverter(formData);

    updateTeacher(teacher).then(({ teachers, error }) => {
      if (error) {
        setError(error.message);
      } else if (teachers && teachers.length > 0) {
        setTeacher(teachers[0]);
      } else {
        setError("Nie znaleziono nauczyciela.");
      }
    })
    .catch(err => setError(err.message)); // Obsługa błędów niezwiązanych z Supabase
  }

  return (
    <>
      {
        editMode ?
          <div className="container mx-auto py-10">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={"https://github.com/shadcn.png"} alt={teacher?.name}/>
                    <AvatarFallback>{teacher?.name[0]}{teacher?.surname[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle>Edycja profilu nauczyciela</CardTitle>
                </div>
              </CardHeader>
              <form action={updateTeacherProxy}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Imię</Label>
                    <Input id="name" name="name" defaultValue={teacher?.name} required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Nazwisko</Label>
                    <Input id="surname" name="surname" defaultValue={teacher?.surname} required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Opis</Label>
                    <Textarea name="description" id="description" placeholder="Powiedz nam coś o sobie"
                              defaultValue={teacher?.description}/>
                  </div>
                  {/*Textarea z polem description */}
                  <div className={"space-y-2"}>
                    <Label htmlFor="name">Miasto</Label>
                    <Select name={"city"} defaultValue={teacher?.city}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Wybierz miasto"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kraków">Kraków</SelectItem>
                        <SelectItem value="Poznań">Poznań</SelectItem>
                        <SelectItem value="Warszawa">Warszawa</SelectItem>
                        <SelectItem value="Wyszków">Wyszków</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className={"space-y-2"}>
                    <Label htmlFor="online">Udzielam lekcji online</Label>
                    <Switch name={"online"} id="online" checked={teacher?.online} onCheckedChange={()=>toggleTeacherBooleanParameter("online")}/>
                  </div>
                  <div className={"space-y-2"}>
                    <Label htmlFor="students_location">Udzielam lekcji online</Label>
                    <Switch name={"students_location"} id="students_location" checked={teacher?.students_location} onCheckedChange={()=>toggleTeacherBooleanParameter("students_location")}/>
                  </div>
                  <div className={"space-y-2"}>
                    <Label htmlFor="teachers_location">Udzielam lekcji online</Label>
                    <Switch name={"teachers_location"} id="teachers_location" checked={teacher?.teachers_location} onCheckedChange={()=>toggleTeacherBooleanParameter("teachers_location")}/>
                  </div>
                  <Input name={"id"} value={teacher?.id} type={"hidden"}/>
                  <div className="text-xs text-muted-foreground">ID: {teacher?.id}</div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="submit">Zapisz zmiany</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          :
          <div className={"flex flex-col"}>
            <p>{error}</p>
            <div className={"flex space-x-4"}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png"/>
                <AvatarFallback>{teacher?.name[0]}{teacher?.surname[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className={"text-3xl"}>{teacher?.name} {teacher?.surname}</h1>
                <small>{user?.id}</small>
              </div>
            </div>
            <p>{teacher?.description}</p>
            <p>{teacher?.city}</p>
            <Button onClick={() => setEditMode(true)}>Edytuj</Button>
          </div>
      }


    </>
  );
}

export default ProfilePage;