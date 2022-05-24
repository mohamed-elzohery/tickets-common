"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(client) {
        this.ackWait = 5 * 1000;
        this.client = client;
    }
    subscripionOptions() {
        return this.client.subscriptionOptions()
            .setAckWait(this.ackWait)
            .setManualAckMode(true)
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName);
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscripionOptions());
        subscription.on('message', (msg) => {
            const parsedMessage = this.parseMessage(msg);
            this.onMessgaeHandler(parsedMessage, msg);
        });
    }
    parseMessage(msg) {
        const data = msg.getData();
        if (typeof data === 'string') {
            return JSON.parse(data);
        }
        else {
            return JSON.parse(data.toString('utf-8'));
        }
    }
}
exports.Listener = Listener;
