import { Message } from "node-nats-streaming";
import { Listener } from './base-listener'
import { MealCreatedEvent } from "./meal-created-event";
import { Subjects } from "./subjects";


export class MealCreatedListener extends Listener<MealCreatedEvent> {
    readonly subject = Subjects.MealCreated;
    queueGroupName = 'meal-service';

    onMessage(data: MealCreatedEvent['data'], msg: Message) {
        console.log('Even Created', data);
        msg.ack();
    }
}