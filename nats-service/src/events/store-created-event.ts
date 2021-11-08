import { Subjects } from "./subjects";

export interface StoreCreatedEvent {
    subject: Subjects.StoreCreated;
    data: any
}