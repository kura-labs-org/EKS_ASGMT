import { Message } from "node-nats-streaming";
import { Listener } from './base-listener'

export class MealCreatedListener extends Listener<{
    subject = 'chef:created';
    queueGroupName = 'payments-service';

    onMessage(data: any, msg: Message) {
        console.log('Even Created', data);

        msg.ack();
    }
}