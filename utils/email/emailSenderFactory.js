const emailSenders = require('./emailSenders');

class EmailSenderFactory {
  constructor() { }

  static create(provider, args) {
    let emailSender = emailSenders[provider];
    if (!emailSender)
      throw new Error('E-mail sender is not found. E-mail Sender provider: ' + provider);
    return new emailSender(args);
  }
}

module.exports = EmailSenderFactory;