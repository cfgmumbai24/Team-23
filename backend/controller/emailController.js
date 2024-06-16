const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

const sendEmail = async (req, res) => {
  const { name, email, message, productName, productQuantity } = req.body;

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: 'Large Order Request',
    text: `
    Dear Janardan Prasad Memorial Multipurpose Social Service Society, \n
    My name is ${name}, and I'm interested in placing a large order on your ecommerce website. However, the number of units I require exceeds the current stock availability for the following product(s): \n
    ${productName} \n
    Quantity Required: ${productQuantity} \n

    Message: ${message} \n

    I understand that fulfilling an order of this size may require additional preparation and coordination from your end. Please advise on the next steps and any additional information you may need from me to proceed with this large order request.
    Thank you for your assistance, and I look forward to your response. \n
    Best regards, \n
    ${name} \n
    ${email}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error sending email' });
  }
};

module.exports = {
  sendEmail
};