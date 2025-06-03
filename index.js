import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
    sendMessage
} from './sendMessage.js';
import {
    handleIncomingMessage
} from './messageHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Webhook verification (GET)
app.get('/webhook', async (req, res) => {
    console.log("🔥 Webhook POST diterima:");
    console.log(JSON.stringify(req.body, null, 2));

    const verifyToken = process.env.VERIFY_TOKEN;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === verifyToken) {
        console.log('Webhook verified');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Webhook receiver (POST)
app.post('/webhook', async (req, res) => {
    const body = req.body;
    if (body.object === 'whatsapp_business_account') {
        for (const entry of body.entry) {
            const changes = entry.changes;
            for (const change of changes) {
                const message = change.value ? .messages ? . [0];
                const from = message ? .from;
                const text = message ? .text ? .body;

                if (from && text) {
                    await handleIncomingMessage(from, text);
                }
            }
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});