import { Subjects } from "./subjects";

export interface MealCreatedEvent {
    subject: Subjects.MealUpdated;
    data: any
}