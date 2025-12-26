"use server";

import {prisma} from '@/prisma/prisma';
import { getSession } from '@/lib/session';

export async function fetchUser() {

    // Get session from JWT cookie

    const session = await getSession();

    if (!session) {
        return { success: false, user: null };
    }

    // Fetch user data
    const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: {
            id: true,
            firstname: true,
            lastName: true,
            email: true,
            phone: true,
            accountType: true,
        },
    });

    return { success: true, user };




}