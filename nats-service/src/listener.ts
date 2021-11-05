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

    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('the service');

    const subscription = stan.subscribe(
        'store:created',
        'store-created-queue-group',
        options);

    subscription.on('message', (msg: Message) =>{
        console.log('message received')
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`ths event #${msg.getSequence()} and the data is ${data}`)
        }

        msg.ack();
    })
})

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;
    abstract onMessage(data: any, msg: Message): void;
    private client: Stan;
    private ackWait = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOption() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    };

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOption()
        );

        subscription.on('message', (msg: Message) => {
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            );

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData()

        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf-8'));
    }
}


