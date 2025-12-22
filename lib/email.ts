/**
 * Email service using Brevo (formerly Sendinblue)
 * Handles transactional email sending with HTML templates
 */

import * as brevo from '@getbrevo/brevo';
import { 
  generateWelcomeEmailTemplate, 
  generateLoginNotificationTemplate 
} from './email-templates';

// Initialize Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ''
);

// Default sender configuration
const DEFAULT_SENDER = {
  name: 'Wanderlate',
  email: process.env.BREVO_SENDER_EMAIL || 'noreply@wanderlate.com',
};

/**
 * Email parameters interface
 */
interface SendEmailParams {
  to: {
    email: string;
    name?: string;
  };
  subject: string;
  htmlContent: string;
  textContent?: string;
  templateId?: number;
  params?: Record<string, unknown>;
  sender?: {
    name: string;
    email: string;
  };
}

/**
 * Send an email using Brevo
 */
export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  try {
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not configured');
      return false;
    }

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = params.sender || DEFAULT_SENDER;
    sendSmtpEmail.to = [params.to];
    sendSmtpEmail.subject = params.subject;
    sendSmtpEmail.htmlContent = params.htmlContent;
    
    if (params.textContent) {
      sendSmtpEmail.textContent = params.textContent;
    }

    if (params.params) {
      sendSmtpEmail.params = params.params;
    }

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    console.log(`Email sent successfully to ${params.to.email}`);
    return true;
  } catch (error) {
    console.error('Failed to send email:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      recipient: params.to.email,
      timestamp: new Date().toISOString(),
    });
    return false;
  }
}





/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(
  email: string,
  userName: string,
  locale: string = 'fr'
): Promise<boolean> {
  const isEnglish = locale === 'en';
  const subject = isEnglish 
    ? `Welcome to Wanderlate, ${userName}!` 
    : `Bienvenue chez Wanderlate, ${userName} !`;

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://wanderlate.com'}/dashboard`;

  return sendEmail({
    to: { email, name: userName },
    subject,
    htmlContent: generateWelcomeEmailTemplate({
      firstName: userName,
      dashboardUrl,
      locale,
    }),
  });
}

/**
 * Send login notification email
 */
export async function sendLoginNotificationEmail(
  email: string,
  userName: string,
  loginDetails: {
    timestamp: Date;
    ipAddress?: string;
    userAgent?: string;
    location?: string;
  },
  locale: string = 'fr'
): Promise<boolean> {
  const isEnglish = locale === 'en';
  const subject = isEnglish 
    ? 'New login to your Wanderlate account' 
    : 'Nouvelle connexion à votre compte Wanderlate';

  const securityUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://wanderlate.com'}/dashboard/settings`;

  return sendEmail({
    to: { email, name: userName },
    subject,
    htmlContent: generateLoginNotificationTemplate({
      firstName: userName,
      timestamp: loginDetails.timestamp,
      ipAddress: loginDetails.ipAddress,
      userAgent: loginDetails.userAgent,
      location: loginDetails.location,
      securityUrl,
      locale,
    }),
  });
}
