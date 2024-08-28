class EmailService {
  constructor(provider1, provider2, maxRetries = 3, rateLimit = 5) {
    this.providers = [provider1, provider2];
    this.maxRetries = maxRetries;
    this.rateLimit = rateLimit;
    this.emailStatus = new Map();
    this.lastSent = 0;
  }

  async sendEmail(emailId, emailContent) {
    if (this.emailStatus.has(emailId)) {
      return this.emailStatus.get(emailId);
    }

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      let attempt = 0;

      while (attempt < this.maxRetries) {
        try {
          await this._rateLimitCheck();
          await provider.sendEmail(emailContent);

          // Log success and update email status
          this.emailStatus.set(emailId, 'Sent');
          console.log(`Email successfully sent using provider ${provider.name}`);
          return 'Sent';
        } catch (error) {
          attempt++;
          console.error(`Attempt ${attempt} failed with ${provider.name}: ${error.message}`);

          if (attempt >= this.maxRetries) {
            console.error(`${provider.name} exhausted. Switching to the next provider.`);
            break; // Break out of the retry loop to switch providers
          } else {
            await this._exponentialBackoff(attempt);
          }
        }
      }
    }

    this.emailStatus.set(emailId, 'Failed');
    throw new Error('Failed to send email after maximum attempts with all providers.');
  }

  async _rateLimitCheck() {
    const now = Date.now();
    if (now - this.lastSent < 1000 / this.rateLimit) {
      await new Promise(resolve => setTimeout(resolve, 1000 / this.rateLimit));
    }
    this.lastSent = now;
  }

  async _exponentialBackoff(retryCount) {
    const delay = Math.pow(2, retryCount) * 100;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

module.exports = EmailService;
