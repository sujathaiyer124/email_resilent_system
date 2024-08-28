class MockEmailProvider {
    constructor(name, failRate = 0) {
      this.name = name; 
      this.failRate = failRate; 
    }
  
    async sendEmail(emailContent) {
      if (Math.random() < this.failRate) {

        throw new Error(`${this.name} failed to send email.`);
      }
      console.log(`${this.name} sent email successfully.`);
    }
  }
  
  module.exports = MockEmailProvider;
  