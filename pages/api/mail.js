const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default function mailAPI(req, res) {
  const body = JSON.parse(req.body)
  
  const message = `
    You got invited to vote in a poll.\r\n
    Click the link below to participate\r\n\r\n
    https://senior-design-lab-3.vercel.app/poll/${body.id}
  `;

  const mail = {
    to: body.users,
    from: 'teamnull2021@gmail.com',
    subject: 'Invitation to vote in a poll',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  };

  sgMail.sendMultiple(mail).then(() => {
    console.log("emails sent successfully!");
    res.status(200).json({ status: 'Ok' })
  }).catch(error => {
    console.log(error);
    res.status(400).json({ status: 'Error' })
  })
}
