import nats from 'node-nats-streaming';

const stan = nats.connect('store', 'abc', {
    url: 'http:localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS')

    const data = JSON.stringify({
        id: '12423',
        chef: true,
        name: 'Jespson Saint-Pierre'
    })

    stan.publish('store:created', data, () =>{
        console.log('Even published')
    })
})

