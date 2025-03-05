import express, { Request, Response } from 'express';
import { initializeDB } from './db/pool';
import messages from './api/messages';

const app = express();

export let pool: any;

(async () => {
    pool = await initializeDB();
})();

app.get('/', async (req: Request, res: Response) => {
    res.send('Hello');
});

app.use(express.json());
app.use('/api/messages', messages);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
