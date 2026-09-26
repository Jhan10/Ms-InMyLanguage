import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

export async function Translate( expression, target_language ) {
    //const apiUrl = 'https://api.mymemory.translated.net/get';
    //const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${targetLanguage}|${targetLanguage}`;
    //const apiUrl = `https://deep-translate1.p.rapidapi.com/language/translate/v2`;
/*          const resp = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Host': 'http://localhost:4602/'
                'Authorization': authToken
            },
            body: JSON.stringify(requestBody),
            signal: AbortSignal.timeout(20000)
        }); */

    try {
        const apiUrl = process.env.DEEPL_URL;
        const authToken = process.env.DEEPL_API_KEY;
        const requestBody = {
            text: expression.split("&"),
            target_lang: target_language
        };
        
        axios.defaults.headers["Authorization"] = authToken;
        axios.defaults.headers["Accept"] = "application/json";
        axios.defaults.headers.post["Content-Type"] = "application/json";

        let tradata = {};
        const res  = await axios.post(apiUrl, requestBody)
            .then(res => {
                tradata = res.data;
            })
            .catch(err => console.log(err));
            //console.log("tradata");
            //console.log(tradata);

            return {
                    text: await tradata.translations[0].text,
                    origin_language: await tradata.translations[0].detected_source_language
                };
    } catch (error) {
        console.log("error");
        console.log(error);
    }
}