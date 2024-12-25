import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'; // Import NextResponse
import {DEBUG_CLERK_SERVICES} from "@/constants/clerk";

const protectedRoutes = createRouteMatcher(['/reports(.*)','/api/(.*)']);
const publicApiRoutes = createRouteMatcher(['/api/reports/status']); // Match the specific public API route

export default clerkMiddleware(
    async (auth, req) => {
        if (publicApiRoutes(req)) {
            return NextResponse.next(); // Important: Return NextResponse.next()
        }

        if (protectedRoutes(req)) {
                await auth.protect(); // Protect this route if not public
        } else {
            console.log("req is not protected, letting it go");
        }
        return NextResponse.next();
    },
    { debug: DEBUG_CLERK_SERVICES === 'YES' }
);

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always protect API routes
        '/(api|trpc)(.*)',
    ],
};