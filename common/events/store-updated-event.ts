import { Subjects } from "./subjects";

export interface StoreUpdatedEvent {
    subject: Subjects.StoreUpdated;
    data: any
}