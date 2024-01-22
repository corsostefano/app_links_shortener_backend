import {nanoid} from 'nanoid';
import validUrl from 'valid-url';
import Link from "../models/links.models.js";
import dotenv from 'dotenv';
import qrcode from 'qrcode';
import * as LinkService from '../services/link.service.js'


dotenv.config()

const serverHost = process.env.SERVER_HOST || 'localhost';
const serverPort = process.env.PORT || 5000;

export  async function shortenLinkController(req, res){
    const { originalUrl } = req.body;

    try {
       const fullShortUrl = await LinkService.shortenLink(originalUrl, serverHost, serverPort);
       res.json({ fullShortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error : 'Server Error'})
    }
}

export async function shortenLinkControllerCustom(req, res) {
    const { originalUrl, customUrl } = req.body;

    if (!validUrl.isUri(originalUrl)) {
        return res.status(400).json({ error: 'Invalid Url' });
    }

    try {
        const fullShortUrl = await LinkService.shortenCustomLink(originalUrl, customUrl, serverHost, serverPort);
        res.json({ fullShortUrl });
    } catch (error) {
        console.error(error);

        if (error.message === 'Invalid Url' || error.message === 'Custom Url already in use') {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: 'Server Error' });
    }
}

export async function redirectToOriginalUrl(req, res){
    const { shortUrl } = req.params;

    try {
        const link = await Link.findOne({ $or: [{ shortUrl }, { customUrl: shortUrl }] });
        if (link){
            return res.redirect(link.originalUrl)
        }else{
            return res.status(404).json({ error : 'URL Not Found'})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error'})
    }   
}

async function generateQRCode(url){
    try {
        const urlString = String(url)

        const qrCode = await qrcode.toDataURL(urlString);
        return qrCode
    } catch (error) {
        console.error(error);
        throw new Error('Error Generating The CodeQR')
    }
}


export async function generateQrCodeController(req, res){
    const { shortUrl } = req.params;

    try {
        const link = await Link.findOne({ $or: [{shortUrl}, { customUrl: shortUrl }] })

        if(link){
            const qrCode = await generateQRCode(link.originalUrl);
            res.json({ qrCode})
        } else {
            return res.status(404).json({ error: 'url Not Found'})
        }

    } catch (error) {
        console.error(error)
        console.log('error al generar', error)
        return res.status(500).json({ error: 'Server Error' })
    }
}
