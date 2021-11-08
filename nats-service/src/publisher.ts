import nats from 'node-nats-streaming';
import { StoreCreatedPublisher } from './events/store-created-publisher';

const stan = nats.connect('store', 'abc', {
    url: 'http:localhost:4222'
});

stan.on('connect', async () => {
    console.log('Publisher connected to NATS')

    const publisher = new StoreCreatedPublisher(stan);
    try{
        await publisher.publish({
            //define the store
        })
    } catch (err) {
        console.log(err);
    }
})

