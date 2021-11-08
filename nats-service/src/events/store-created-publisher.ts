import { Publisher } from "./base-publisher"; 
import { StoreCreatedEvent } from "./store-created-event";
import { Subjects } from "./subjects";

export class StoreCreatedPublisher extends Publisher<StoreCreatedEvent> {
        readonly subject = Subjects.StoreCreated;
}

