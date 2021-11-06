import nats, { Message, Stan } from 'node-nats-streaming';

console.clear();

const stan = nats.connect('store', '123', {
    url: 'http:localhost:4222'
});


stan.on('connect', () =>{
    console.log('Publisher connected to NATS');

    stan.on('close', () =>{
        console.log('connection closes');
        process.exit();
    })

    new UserCreatedListener(stan).listen();
    new ChefCreatedListener(stan).listen();

})

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

class UserCreatedListener extends Listener {
    subject = 'user:created';
    queueGroupName = 'payments-service';

    onMessage(data: any, msg: Message) {
        console.log('event created', data);

        msg.ack();
    }
}
class ChefCreatedListener extends Listener{
    subject = 'chef:created';
    queueGroupName = 'payments-service';

    onMessage(data: any, msg: Message) {
        console.log('Even Created', data);

        msg.ack();
    }
}

