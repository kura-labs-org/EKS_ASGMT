import { Message } from "node-nats-streaming";
import { Listener } from './base-listener'
import { StoreCreatedEvent } from "./store-created-event";
import { Subjects } from "./subjects";

export class StoreCreatedListener extends Listener<StoreCreatedEvent> {
    readonly subject = Subjects.StoreCreated;
    queueGroupName = 'payments-service';

    onMessage(data: StoreCreatedEvent['data'], msg: Message) {
        console.log('Even Created', data);
        msg.ack();
    }
}