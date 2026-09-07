const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadMedia, sendDocumentMessage } = require('../services/whatsapp');

// Use memory storage so we don't have to write the PDF to disk locally
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('pdfInvoice'), async (req, res) => {
  try {
    const file = req.file;
    const customerDetails = JSON.parse(req.body.customerDetails || '{}');
    const totalAmount = req.body.totalAmount;

    if (!file) {
      return res.status(400).json({ error: 'No PDF invoice uploaded.' });
    }

    console.log(`Received order from ${customerDetails.name} for Rs. ${totalAmount}`);

    // 1. Upload the PDF to WhatsApp to get a media ID
    const mediaId = await uploadMedia(file.buffer, file.originalname || 'order.pdf');

    if (mediaId) {
      // 2. Prepare the caption
      let caption = `*New Order Received!*\n\n`;
      caption += `*Customer Name:* ${customerDetails.name}\n`;
      caption += `*Phone:* ${customerDetails.phone}\n`;
      caption += `*Total Estimate:* Rs. ${totalAmount}\n\n`;
      caption += `Please see the attached PDF for the full order details.`;

      // 3. Send the document message to the shop owner
      const ownerPhone = process.env.OWNER_PHONE_NUMBER;
      await sendDocumentMessage(ownerPhone, mediaId, caption);
    }

    res.status(200).json({ message: 'Order received and WhatsApp message sent successfully!' });
  } catch (error) {
    console.error('Order processing error:', error);
    res.status(500).json({ error: 'Failed to process order and send WhatsApp message.' });
  }
});

module.exports = router;
