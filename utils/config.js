module.exports = {
  smtpEmail: {
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_AUTH_USER,
      pass: process.env.SMPT_AUTH_PASS,
    },
  },
};
