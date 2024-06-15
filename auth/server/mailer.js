const nodemailer=require('nodemailer');
const env=require('dotenv');
env.config({ path: './config.env' });
let transporter = nodemailer.createTransport({
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

  module.exports=transporter;

  // let mailOptions = {
  //   from: "mustansirzain2@gmail.com",
  //   to: "mustansir.bohari21@vit.edu",
  //   subject: 'Nodemailer Project',
  //   text: 'Hi from your nodemailer project'
  // };

  // transporter.sendMail(mailOptions, function(err, data) {
  //   if (err) {
  //     console.log("Error " + err);
  //   } else {
  //     console.log("Email sent successfully");
  //   }
  // });
