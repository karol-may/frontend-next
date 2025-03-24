import {Subject} from "@/types/Subject";

export interface SubjectsControllerInterface {

}

//CRUD
export function fetchSubjects() : Promise<SubjectsControllerInterface>
{}

export function addSubject(subject : Subject) : Promise<SubjectsControllerInterface>
{}

export function updateSubject(subject : Subject) : Promise<SubjectsControllerInterface>
{}

export function removeSubject(subject : Subject) : Promise<SubjectsControllerInterface>
{}