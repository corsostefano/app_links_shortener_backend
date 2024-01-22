import  express  from "express";
import * as LinkController from "../../controllers/link.controller.js"

const router = express.Router();

router.post('/shorten', LinkController.shortenLinkController);
router.post('/shorten/custom', LinkController.shortenLinkControllerCustom)
router.post('/shorten/qrcode', LinkController.generateQrCodeController)
router.get('/:shortUrl', LinkController.redirectToOriginalUrl)

export default router