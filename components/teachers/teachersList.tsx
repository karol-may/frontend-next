"use client";

import {createClient} from "@/utils/supabase/client";
import {SetStateAction, useEffect, useState} from "react";
import {Teacher} from "@/types/Teacher";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import TeacherListFilterBoolean from "@/components/teachers/teacherList/teacherListFilterBoolean";
import {Input} from "@/components/ui/input";
import TeachersListElement from "@/components/teachers/teacherList/teachersListElement";
import {fetchTeachers} from "@/components/teachers/actions";

function TeachersList() {
  const [selectedCity, setSelectedCity] = useState<string>("Wyszków");
  const [nameSearchQuery, setNameSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [online, setOnline] = useState(false);
  const [studentsLocation, setStudentsLocation] = useState(false);
  const [teachersLocation, setTeachersLocation] = useState(false);

  useEffect(() => {
    fetchTeachers(selectedCity, online, studentsLocation, teachersLocation, nameSearchQuery, setTeachers, setError);
  }, [online, studentsLocation, teachersLocation, nameSearchQuery, selectedCity]);

  function queryInputOnChangeHandler(event: { target: { value: SetStateAction<string>; }; }) {
      let value = event.target.value;
        setNameSearchQuery(value);
  }

  return (
    <>
      {error && <p style={{color: "red"}}>Błąd: {error}</p>}
      <div className={"space-y-4"}>
        <Input onChange={queryInputOnChangeHandler} value={nameSearchQuery}/>
        <TeacherListFilterBoolean name={"Pokaż nauczycieli oferujących nauczanie zdalne?"} desc={"Nauczanie za pomocą internetu."} checked={online} onCheckedChange={setOnline}/>
        <TeacherListFilterBoolean name={"Pokaż nauczycieli oferujących nauczanie w lokalu nauczyciela?"} checked={teachersLocation} onCheckedChange={setTeachersLocation}/>
        <TeacherListFilterBoolean name={"Pokaż nauczycieli oferujących nauczanie w domu ucznia?"} checked={studentsLocation} onCheckedChange={setStudentsLocation}/>
        <Select onValueChange={setSelectedCity} value={selectedCity}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Wszystkie">Wszystkie</SelectItem>
            <SelectItem value="Wyszków">Wyszków</SelectItem>
            <SelectItem value="Warszawa">Warszawa</SelectItem>
          </SelectContent>
        </Select>
        {teachers.map((teacher) => (
          <TeachersListElement key={teacher.id} teacher={teacher}/>
        ))}
      </div>
    </>
  );
}

export default TeachersList;
