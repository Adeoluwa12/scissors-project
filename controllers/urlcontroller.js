const validUrl = require('valid-url');
const shortid = require('shortid');
const QRCode = require('qrcode');

const { Url } = require('../models/url');

module.exports.urlController = {
  getUrls: async (req, res) => {
    try {
      const userId = req.session.user._id;
      const urls = await Url.find({ userId });

      res.render('dashboard', { user: req.session.user, urls });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  createShortUrl: async (req, res) => {
    const { longUrl, shortUrl } = req.body;

    // Check if the long URL is valid
    if (!validUrl.isUri(longUrl)) {
      return res.render('new', {
        error: 'Invalid URL',
        longUrl,
        shortUrl,
      });
    }

    // Check if the short URL is available
    const existingUrl = await Url.findOne({ shortUrl });
    if (existingUrl) {
      return res.render('new', {
        error: 'Short URL already exists',
        longUrl,
        shortUrl,
      });
    }

    // Generate a unique short ID
    const uniqueId = shortid.generate();

    // Construct the short URL
    const baseShortUrl = '/'; // Replace with your domain name
    const newShortUrl = `${baseShortUrl}${uniqueId}`;

    // Generate QR code for the short URL
    const qrCode = await QRCode.toDataURL(newShortUrl);

    try {
      const userId = req.session.user._id;

      // Create a new URL document
      const url = new Url({
        longUrl,
        shortUrl: newShortUrl,
        qrCode,
        userId,
      });

      await url.save();

      res.render('shorten', { shortUrl: newShortUrl, qrCode });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  getUrlClicks: async (req, res) => {
    const urlId = req.params.id;

    try {
      const url = await Url.findById(urlId);
      if (!url) {
        return res.status(404).send('URL not found');
      }

      res.render('clicks', { shortUrl: url.shortUrl, clickCount: url.clickCount });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },
};
