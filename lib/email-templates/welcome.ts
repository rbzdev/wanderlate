/**
 * Welcome Email Template
 * Sent to new users after registration
 */

interface WelcomeEmailParams {
  firstName: string;
  dashboardUrl: string;
  locale: string;
}

export function generateWelcomeEmailTemplate(params: WelcomeEmailParams): string {
  const { firstName, dashboardUrl, locale } = params;
  const isEnglish = locale === 'en';

  const content = {
    title: isEnglish ? 'Welcome to Wanderlate' : 'Bienvenue sur Wanderlate',
    greeting: isEnglish ? 'Hello' : 'Bonjour',
    message: isEnglish 
      ? 'Your Wanderlate account has been successfully created.<br />You can now access your personal space.'
      : 'Votre compte Wanderlate a bien été créé.<br />Vous pouvez maintenant accéder à votre espace.',
    ctaButton: isEnglish ? 'Access your account' : 'Accéder à votre compte',
    feature1Title: isEnglish ? 'Book unique stays' : 'Réservez des séjours uniques',
    feature1Desc: isEnglish ? 'Discover amazing accommodations worldwide' : 'Découvrez des hébergements extraordinaires',
    feature2Title: isEnglish ? 'Exclusive member prices' : 'Prix membres exclusifs',
    feature2Desc: isEnglish ? 'Save up to 10% on your bookings' : 'Économisez jusqu\'à 10% sur vos réservations',
    feature3Title: isEnglish ? 'Organize your trips' : 'Organisez vos voyages',
    feature3Desc: isEnglish ? 'Plan and manage all your travels in one place' : 'Planifiez et gérez tous vos déplacements au même endroit',
    footer: isEnglish
      ? 'If you didn\'t create this account, you can ignore this email.<br /><br />Thank you,<br />The Wanderlate Team'
      : 'Si vous n\'êtes pas à l\'origine de cette inscription, vous pouvez ignorer cet e-mail.<br /><br />Merci,<br />L\'équipe Wanderlate',
  };

  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="min-height: 100vh; padding: 40px 16px;">
    <div style="max-width: 672px; margin: 0 auto;">
      
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 32px;">
        <img src="https://wanderlate-com.vercel.app/assets/logos/logo.default.jpg" alt="Wanderlate" style="height: 32px; width: 32px; object-fit: contain;" />
        <h1 style="margin: 0; color: #000000; font-size: 18px; font-weight: 600; letter-spacing: -0.025em;">${content.title}</h1>
      </div>

      <!-- Content -->
      <div style="padding: 0;">
        <!-- Greeting -->
        <p style="color: #1f2937; font-size: 18px; margin-bottom: 16px;">
          ${content.greeting} <strong>${firstName}</strong>,
        </p>

        <!-- Message -->
        <p style="color: #4b5563; font-size: 16px; line-height: 1.625; margin-bottom: 32px;">
          ${content.message}
        </p>

        <!-- Features -->
        <div style="margin-bottom: 32px;">
          <!-- Feature 1 -->
          <div style="display: flex; align-items: flex-start; gap: 16px; padding: 16px; background-color: rgba(0, 149, 254, 0.1); border-radius: 0 8px 8px 0; border-left: 4px solid #0095FE; margin-bottom: 16px;">
            <div style="flex-shrink: 0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#0095FE" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3 11.99v2.51c0 3.3 0 4.95 1.025 5.975S6.7 21.5 10 21.5h4c3.3 0 4.95 0 5.975-1.025S21 17.8 21 14.5v-2.51c0-1.682 0-2.522-.356-3.25s-1.02-1.244-2.346-2.276l-2-1.555C14.233 3.303 13.2 2.5 12 2.5s-2.233.803-4.298 2.409l-2 1.555C4.375 7.496 3.712 8.012 3.356 8.74S3 10.308 3 11.99"/><path d="M15 17c-.8.622-1.85 1-3 1s-2.2-.378-3-1"/></g></svg>
            </div>
            <div style="flex: 1;">
              <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #1f2937; font-size: 16px;">${content.feature1Title}</h3>
              <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.625;">${content.feature1Desc}</p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div style="display: flex; align-items: flex-start; gap: 16px; padding: 16px; background-color: rgba(0, 149, 254, 0.1); border-radius: 0 8px 8px 0; border-left: 4px solid #0095FE; margin-bottom: 16px;">
            <div style="flex-shrink: 0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#0095FE" stroke-linejoin="round" stroke-width="1"><path stroke-linecap="round" d="M12.586 4.586A2 2 0 0 0 11.172 4H4v7.172a2 2 0 0 0 .586 1.414l7 7a2 2 0 0 0 2.828 0l5.172-5.172a2 2 0 0 0 0-2.828z"/><path stroke-width="1.5" d="M9 9h.01v.01H9z"/></g></svg>
            </div>
            <div style="flex: 1;">
              <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #1f2937; font-size: 16px;">${content.feature2Title}</h3>
              <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.625;">${content.feature2Desc}</p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div style="display: flex; align-items: flex-start; gap: 16px; padding: 16px; background-color: rgba(0, 149, 254, 0.1); border-radius: 0 8px 8px 0; border-left: 4px solid #0095FE;">
            <div style="flex-shrink: 0;">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#0095FE" d="m14.937 28l-.259 1H7.5A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3h17A4.5 4.5 0 0 1 29 7.5v7.086a4.4 4.4 0 0 0-1-.087V11H4v13.5A3.5 3.5 0 0 0 7.5 28zM4 10h24V7.5A3.5 3.5 0 0 0 24.5 4h-17A3.5 3.5 0 0 0 4 7.5zm17.535 19.467l8.61-8.543a2.88 2.88 0 0 0 .071-4.017a2.88 2.88 0 0 0-4.144-.057l-8.567 8.64c-.331.334-.568.75-.686 1.205l-.79 3.052a1 1 0 0 0 1.217 1.219l3.02-.778a2.8 2.8 0 0 0 1.269-.721M11 16.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m5 1.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m8-1.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0M9.5 24a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m8-1.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/></svg>
            </div>
            <div style="flex: 1;">
              <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #1f2937; font-size: 16px;">${content.feature3Title}</h3>
              <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.625;">${content.feature3Desc}</p>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${dashboardUrl}" style="display: inline-block; padding: 12px 24px; background-color: #0095FE; color: #ffffff; font-weight: 600; text-decoration: none; border-radius: 6px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
            ${content.ctaButton}
          </a>
        </div>

        <!-- Footer Note -->
        <div style="padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <p style="color: #4b5563; font-size: 14px; line-height: 1.625; margin: 0;">
            ${content.footer}
          </p>
        </div>
      </div>

      <!-- Brand Footer -->
      <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb; margin-top: 32px;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} Wanderlate SAS. ${isEnglish ? 'All rights reserved.' : 'Tous droits réservés.'}
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `;
}
