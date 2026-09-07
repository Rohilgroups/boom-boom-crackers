const axios = require('axios');
const FormData = require('form-data');

/**
 * Uploads a file to Meta's WhatsApp API to get a media ID.
 * @param {Buffer} fileBuffer - The PDF file buffer
 * @param {string} originalname - The original filename
 * @returns {Promise<string|null>} - The media ID, or null if using placeholders/failed
 */
async function uploadMedia(fileBuffer, originalname) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (token === 'YOUR_WHATSAPP_ACCESS_TOKEN') {
    console.log(`[MOCK] Would upload ${originalname} to WhatsApp Media API.`);
    return 'mock_media_id_12345';
  }

  try {
    const formData = new FormData();
    formData.append('file', fileBuffer, {
      filename: originalname,
      contentType: 'application/pdf',
    });
    formData.append('type', 'document');
    formData.append('messaging_product', 'whatsapp');

    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/media`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.id;
  } catch (error) {
    console.error('Error uploading media to WhatsApp:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Sends a WhatsApp message with the attached media (PDF).
 * @param {string} toPhoneNumber - The recipient's phone number
 * @param {string} mediaId - The media ID of the uploaded PDF
 * @param {string} caption - The message text
 */
async function sendDocumentMessage(toPhoneNumber, mediaId, caption) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (token === 'YOUR_WHATSAPP_ACCESS_TOKEN') {
    console.log(`[MOCK] Would send WhatsApp message to ${toPhoneNumber} with media ${mediaId} and caption: "${caption}"`);
    return;
  }

  try {
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: toPhoneNumber,
      type: 'document',
      document: {
        id: mediaId,
        caption: caption,
        filename: 'BoomBoom_Pyrotech_Order.pdf'
      }
    };

    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Successfully sent WhatsApp message:', response.data);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  uploadMedia,
  sendDocumentMessage
};
