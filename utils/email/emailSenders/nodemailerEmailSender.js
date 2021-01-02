const nodemailer = require("nodemailer");

class Nodemailer {
  constructor(args) {
    this.transporter = nodemailer.createTransport(args);
  }

  sendEmailAsync({ from, to, subject, text = null, html = null }) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(
        { from, to, subject, text, html },
        function (err, info) {
          if (err) reject(err);
          else resolve(info.response);
        }
      );
    });
  }
}

module.exports = Nodemailer;
