import express from 'express';

import { Translate } from '../api/Translater.js';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';

const app = express();
app.use(express.json());

const { API_PORT } = process.env;
const corsOptions = {
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};
const staticFilesPath = path.join(process.cwd(), 'api/public');

app.use(cors(corsOptions));
app.use('/UI',express.static(staticFilesPath));
app.use('/UI/Expression',express.static(staticFilesPath+'/expression.html'));

app.get("/", (req, res) => {
  res.send(`<pre> Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.get('/UI', (req, res) => {
    res.sendFile(path.join(staticFilesPath, 'index.html'));
});

app.post('/Translate', async (req, res) => {
const { expression, target_language } = req.body;
    let t_languange = target_language;
    // Handle translation logic here
    if(!target_language){
        t_languange = process.env.TARGET_LANGUAGE_DEFAULT;
    }

    const result = await Translate(expression, t_languange);

    res.json({ translation: result.text });
});

app.post('/UI/Translate', async (req, res) => {
    const { expression, target_language } = req.body;
    let t_languange = target_language;
    // Handle translation logic here
    if(!target_language){
        t_languange = process.env.TARGET_LANGUAGE_DEFAULT;
    }

    const result = await Translate(expression, t_languange);

    res.json({ translation: result });

});

app.listen(API_PORT, () => {
    console.log(`Server is running on port ${API_PORT} \n http://localhost:${API_PORT}/`);
});
