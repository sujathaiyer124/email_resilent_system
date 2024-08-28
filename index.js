const EmailService = require('./emailService');
const MockEmailProvider = require('./mockEmailProvider');

(async () => {
  const provider1 = new MockEmailProvider('Provider1', 0.9);
  const provider2 = new MockEmailProvider('Provider2', 0.1);

  const emailService = new EmailService(provider1, provider2);

  try {
    const status = await emailService.sendEmail('sujataiye24@gmail.com', { subject: 'Test', body: 'This is a test email.' });
    console.log(`Email Status: ${status}`);
  } catch (error) {
    console.error(error.message);
  }
})();
