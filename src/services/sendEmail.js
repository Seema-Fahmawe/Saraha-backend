import nodemailer from 'nodemailer';

export async function sendEmail(to,subject,html){
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, 
          pass: process.env.EMAIL_PASSWORD, 
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `Seema Fahmawe" <${process.env.EMAIL}>`, 
        to,
        subject,
        html,
      });
}
