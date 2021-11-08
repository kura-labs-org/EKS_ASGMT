import { Subjects } from "./subjects";

export interface MealCreatedEvent {
    subject: Subjects.MealCreated;
    data: any
}