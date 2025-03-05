import express, { Request, Response } from 'express';
import { pool } from '../../index';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

interface Message {
    id: string;
    user_id: string;
    responses: string[];
    message_content: {
        user_message: string;
        system_message: string;
    };
    timestamp: Date;
    status: string;
    llms: string[];
}

router.get('/', async (req: Request, res: Response) => {
    const messages = await pool.collection('messages').find().toArray();
    res.json(messages);
});

router.post('/', async (req: Request, res: Response) => {
    // TODO
    res.send('POST request to the messages endpoint');
});

export default router;