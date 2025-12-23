import { prisma } from "@/prisma/prisma";

/**
 * Create welcome message for new user
 * Called after user registration
 */
export async function createWelcomeMessage(userId: string, locale: string = 'fr') {
  const welcomeMessages = {
    fr: {
      subject: 'Bienvenue sur Wanderlate ! 🎉',
      content: `Bonjour et bienvenue sur Wanderlate !

Nous sommes ravis de vous compter parmi nous. Wanderlate est votre compagnon de voyage idéal pour explorer le monde.

Voici quelques conseils pour bien démarrer :

✈️ Explorez nos destinations
Découvrez des milliers d'hébergements partout dans le monde, des hôtels luxueux aux appartements chaleureux.

🔍 Planifiez votre voyage
Utilisez notre outil de recherche pour trouver le logement parfait selon vos dates et votre budget.

💳 Réservez en toute sécurité
Vos paiements sont protégés et sécurisés par notre système de paiement Stripe.

📱 Gérez vos réservations
Retrouvez toutes vos réservations dans votre tableau de bord et recevez des notifications importantes.

🌟 Profitez de votre expérience
N'hésitez pas à contacter notre support si vous avez des questions. Nous sommes là pour vous aider !

Bon voyage avec Wanderlate !

L'équipe Wanderlate`,
    },
    en: {
      subject: 'Welcome to Wanderlate! 🎉',
      content: `Hello and welcome to Wanderlate!

We're thrilled to have you with us. Wanderlate is your ideal travel companion to explore the world.

Here are some tips to get started:

✈️ Explore our destinations
Discover thousands of accommodations around the world, from luxury hotels to cozy apartments.

🔍 Plan your trip
Use our search tool to find the perfect accommodation according to your dates and budget.

💳 Book securely
Your payments are protected and secured by our Stripe payment system.

📱 Manage your bookings
Find all your bookings in your dashboard and receive important notifications.

🌟 Enjoy your experience
Don't hesitate to contact our support if you have any questions. We're here to help!

Happy travels with Wanderlate!

The Wanderlate Team`,
    },
  };

  const message = welcomeMessages[locale as 'fr' | 'en'] || welcomeMessages.fr;

  try {
    await prisma.message.create({
      data: {
        receiverId: userId,
        type: 'system',
        subject: message.subject,
        content: message.content,
        status: 'unread',
        isRead: false,
      },
    });
  } catch (error) {
    console.error('Failed to create welcome message:', error);
  }
}

/**
 * Get unread messages count for a user
 */
export async function getUnreadMessagesCount(userId: string): Promise<number> {
  return await prisma.message.count({
    where: {
      receiverId: userId,
      isRead: false,
    },
  });
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(messageId: string, userId: string) {
  return await prisma.message.update({
    where: {
      id: messageId,
      receiverId: userId,
    },
    data: {
      isRead: true,
      readAt: new Date(),
      status: 'read',
    },
  });
}

/**
 * Archive message
 */
export async function archiveMessage(messageId: string, userId: string) {
  return await prisma.message.update({
    where: {
      id: messageId,
      receiverId: userId,
    },
    data: {
      status: 'archived',
    },
  });
}
