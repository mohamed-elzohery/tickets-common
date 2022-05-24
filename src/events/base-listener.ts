import { Message, Stan } from 'node-nats-streaming';
import {Subjects} from './Subjects';

interface Event{
    subject: Subjects;
    data: any
}

export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessgaeHandler(parsedMsg: unknown, msg: Message): void;
    private client: Stan;
    private ackWait: number = 5 * 1000;

    constructor(client: Stan){
        this.client = client;
    }

    subscripionOptions(){
        return this.client.subscriptionOptions()
                   .setAckWait(this.ackWait)
                   .setManualAckMode(true)
                   .setDeliverAllAvailable()
                   .setDurableName(this.queueGroupName);
    }

    listen(){
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscripionOptions());

        subscription.on('message', (msg: Message) => {
            const parsedMessage: T = this.parseMessage(msg);
            this.onMessgaeHandler(parsedMessage, msg);
        })
    }

    parseMessage(msg: Message){
        const data = msg.getData();
        if(typeof data === 'string'){
            return JSON.parse(data);
        }else{
            return JSON.parse(data.toString('utf-8'));
        }
    }
} 