# Email Resilient System

## Overview

This project demonstrates a resilient email sending service implemented in Node.js. It uses mock email providers with retry and fallback mechanisms to ensure that emails are sent successfully, even in the face of provider failures.

## Files

- `index.js`: Entry point of the application. Initializes the email service and attempts to send an email.
- `emailService.js`: Contains the `EmailService` class with retry, fallback, and rate limiting logic.
- `mockEmailProvider.js`: Contains the `MockEmailProvider` class that simulates email sending with configurable failure rates.

## Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
2. **Run the application**
    ```bash 
    npm start 