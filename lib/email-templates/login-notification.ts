/**
 * Login Notification Email Template
 * Sent when a user logs into their account
 */

interface LoginNotificationParams {
  firstName: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  securityUrl: string;
  locale: string;
}

export function generateLoginNotificationTemplate(params: LoginNotificationParams): string {
  const { firstName, timestamp, ipAddress, userAgent, location, securityUrl, locale } = params;
  const isEnglish = locale === 'en';

  const content = {
    title: isEnglish ? 'New Login Detected' : 'Nouvelle connexion détectée',
    greeting: isEnglish ? 'Hello' : 'Bonjour',
    message: isEnglish
      ? 'We detected a new login to your Wanderlate account.'
      : 'Nous avons détecté une nouvelle connexion à votre compte Wanderlate.',
    detailsTitle: isEnglish ? 'Login Details' : 'Détails de la connexion',
    dateLabel: isEnglish ? 'Date & Time' : 'Date et heure',
    ipLabel: isEnglish ? 'IP Address' : 'Adresse IP',
    deviceLabel: isEnglish ? 'Device' : 'Appareil',
    locationLabel: isEnglish ? 'Location' : 'Localisation',
    securityNote: isEnglish
      ? '<strong>If this wasn\'t you</strong>, please secure your account immediately by changing your password.'
      : '<strong>Si ce n\'était pas vous</strong>, veuillez sécuriser votre compte immédiatement en changeant votre mot de passe.',
    ctaButton: isEnglish ? 'Secure My Account' : 'Sécuriser mon compte',
    footer: isEnglish
      ? 'This is an automated security notification.<br />If you have concerns, please contact our support team.<br /><br />Thank you,<br />The Wanderlate Team'
      : 'Ceci est une notification de sécurité automatique.<br />Si vous avez des inquiétudes, veuillez contacter notre équipe support.<br /><br />Merci,<br />L\'équipe Wanderlate',
  };

  const formattedDate = timestamp.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

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

        <h1 style="margin: 0; color: #000000; font-size: 14px; font-weight: 600; letter-spacing: -0.025em;">${content.title}</h1>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="#dc2626" fill-opacity="0.25" d="M4 12c0-.943 0-1.414.293-1.707S5.057 10 6 10h12c.943 0 1.414 0 1.707.293S20 11.057 20 12v6.038c0 .38 0 .571-.029.74a2 2 0 0 1-1.164 1.49c-.156.07-.341.116-.71.208c-1.238.31-1.857.464-2.476.578c-2.394.44-4.848.44-7.243 0c-.618-.114-1.237-.269-2.474-.578c-.37-.092-.555-.139-.71-.207a2 2 0 0 1-1.165-1.492C4 18.61 4 18.42 4 18.037z"/><path stroke="#dc2626" d="M16.5 10V9a4.5 4.5 0 1 0-9 0v1" stroke-width="1"/><circle cx="12" cy="15" r="2" fill="#dc2626"/><path stroke="#dc2626" stroke-linecap="round" d="M12 16v2.5" stroke-width="1"/></g></svg>
      </div>

      <!-- Content -->
      <div style="padding: 0;">
        <!-- Greeting -->
        <p style="color: #1f2937; font-size: 18px; margin-bottom: 16px;">
          ${content.greeting} <strong>${firstName}</strong>,
        </p>

        <!-- Message -->
        <p style="color: #4b5563; font-size: 16px; line-height: 1.625; margin-bottom: 24px;">
          ${content.message}
        </p>

        <!-- Details Box -->
        <div style="background-color: rgba(220, 38, 38, 0.1); border: 1px solid #dc2626; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
          <!-- Title -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#dc2626" d="M12.558 2.982a1.75 1.75 0 0 0-1.122 0L4.66 5.277a1.19 1.19 0 0 0-.817 1.019c-.337 4.226.248 7.351 1.637 9.712c1.344 2.285 3.494 3.946 6.517 5.184c3.026-1.238 5.178-2.899 6.522-5.184c1.39-2.36 1.975-5.486 1.638-9.712a1.19 1.19 0 0 0-.817-1.019zm-1.603-1.42a3.25 3.25 0 0 1 2.084-.001l6.782 2.295a2.69 2.69 0 0 1 1.83 2.32c.353 4.41-.24 7.876-1.839 10.593c-1.604 2.725-4.161 4.598-7.54 5.929a.75.75 0 0 1-.55 0c-3.376-1.331-5.932-3.204-7.535-5.929c-1.598-2.717-2.191-6.184-1.839-10.593a2.69 2.69 0 0 1 1.83-2.32z"/><path fill="#dc2626" d="M12 20c5.032-2.04 7.406-5.618 6.943-12.367c-.052-.767-.576-1.416-1.303-1.669l-4.82-1.678a2.5 2.5 0 0 0-.82-.139z" opacity="0.5"/></svg>
            <h3 style="margin: 0; font-weight: 600; color: #1f2937; font-size: 16px;">${content.detailsTitle}</h3>
          </div>

          <!-- Details List -->
          <div style="margin: 0;">
            <!-- Date & Time -->
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
              <div style="flex-shrink: 0; display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; width: 128px; color: #92400e;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${content.dateLabel}:</span>
              </div>
              <div style="color: #78350f; font-size: 14px; flex: 1;">${formattedDate}</div>
            </div>

            ${ipAddress ? `
            <!-- IP Address -->
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
              <div style="flex-shrink: 0; display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; width: 128px; color: #92400e;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <span>${content.ipLabel}:</span>
              </div>
              <div style="color: #78350f; font-size: 14px; flex: 1;">${ipAddress}</div>
            </div>
            ` : ''}

            ${userAgent ? `
            <!-- Device -->
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
              <div style="flex-shrink: 0; display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; width: 128px; color: #92400e;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                <span>${content.deviceLabel}:</span>
              </div>
              <div style="color: #78350f; font-size: 14px; flex: 1;">${userAgent}</div>
            </div>
            ` : ''}

            ${location ? `
            <!-- Location -->
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <div style="flex-shrink: 0; display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; width: 128px; color: #92400e;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>${content.locationLabel}:</span>
              </div>
              <div style="color: #78350f; font-size: 14px; flex: 1;">${location}</div>
            </div>
            ` : ''}
          </div>
        </div>

        <!-- Security Warning -->
        <p style="color: #ef4444; font-size: 14px; line-height: 1.625; margin-bottom: 24px;">
          ${content.securityNote}
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${securityUrl}" style="display: inline-block; padding: 10px 16px; background-color: #dc2626; color: #ffffff; font-weight: 600; text-decoration: none; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
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
