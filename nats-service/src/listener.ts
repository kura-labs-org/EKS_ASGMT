import nats, { Message, Stan } from 'node-nats-streaming';
import { UserCreatedListener } from './events/user-created-listener'
import { ChefCreatedListener } from './events/chef-created-listener'

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


