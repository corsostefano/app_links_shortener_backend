import validUrl from "valid-url";
import Link from "../models/links.models.js";
import { nanoid } from "nanoid";

export async function shortenLink(originalUrl, serverHost, serverPort){
    if(!validUrl.isUri(originalUrl)){
        throw new Error('Invalid Url')
    }

    try {
        let link = await Link.findOne({originalUrl});

        if(link){
            return `http://${serverHost}:${serverPort}/${link.shortUrl}`
        }else{
            const shortUrl = nanoid(8);
            const newLink = new Link({ originalUrl, shortUrl});
            link = await newLink.save(); 
            return `http://${serverHost}:${serverPort}/${shortUrl}`;

        }
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');  
    }
}

export async function shortenCustomLink(originalUrl, customUrl, serverHost, serverPort){
    if (!validUrl.isUri(originalUrl)) {
        throw new Error('Invalid Url');
    }

    try {
        let link = await Link.findOne({originalUrl});

        if(link){
            return `http://${serverHost}:${serverPort}/${link.shortUrl}`
        }
        if (customUrl) {
            const existingLink = await Link.findOne({ customUrl });

            if (existingLink) {
                throw new Error('Custom Url already in use');
            }

            link = new Link({ originalUrl, customUrl });
        } else {
            const shortUrl = nanoid(8);
            link = new Link({ originalUrl, shortUrl });
        }

        link = await link.save();
        return `http://${serverHost}:${serverPort}/${link.customUrl || link.shortUrl}`;
    } catch (error) {
        console.error(error);
        throw new Error('Server Error');
    }
}