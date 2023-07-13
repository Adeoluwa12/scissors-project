const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const QRCode = require('qrcode');
const URL = require('../models/url');

router.get('/', (req, res) => {
  if (req.session.userId) {
    res.render('dashboard');
  } else {
    res.redirect('/login');
  }
});

// const baseUrl = 'http:localhost:9000'

// router.post('/new/shorten', async (req, res) => {
//   const { longUrl, shortUrl } = req.body;

//   if (!validUrl.isUri(longUrl)) {
//     return res.status(400).send('Invalid URL');
//   }

//   try {
//     let url = await URL.findOne({ shortUrl });

//     if (url) {
//       return res.status(400).send('Short URL already exists');
//    }

//     if (!shortUrl) {
//       const urlCode = shortid.generate();
//       // url = new URL({ longUrl, shortUrl: generatedShortUrl });
//      } 
//      else { 
//       const shortUrl = baseUrl + '/' + 'urlCode'

//       url = new Url({
//         longUrl,
//         shortUrl,
//         generatedShortUrl,
//         date: new Date()
//       })
//       await url.save();
//       res.json(url)
//     }


//     const qrcode = await generateQRCode(url.shortUrl);

//     res.json({ url, qrcode });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// async function generateQRCode(url) {
//   try {
//     const qrcode = await QRCode.toBuffer(url);
//     return qrcode;
//   } catch (error) {
//     console.error('QR Code Generation Error:', error);
//     return null;
//   }
// }




router.get('/new', (req, res) => {
  res.render('new')
});


module.exports = router;