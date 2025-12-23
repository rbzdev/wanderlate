"use server";

import { prisma } from '@/prisma/prisma';
import { getSession } from '@/lib/session';
import { success } from 'zod';

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            firstname: true,
            lastName: true,
            phone: true,
            country: true,
            accountType: true,
            createdAt: true,
        },
    });
    return user;
}

export async function getCurrentUser() {
    const session = await getSession();

    if (!session?.userId) {
        return { success: false, user: null };
    }

    // Récupérer les données utilisateur
    const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: {
            id: true,
            email: true,
            firstname: true,
            lastName: true,
            phone: true,
            country: true,
            accountType: true,
            createdAt: true,
        },
    });

    if (!user) {
        return { success: false, user: null };
    }

    return { success: true, user };
}