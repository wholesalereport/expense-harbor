import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import {DEBUG_CLERK_SERVICES} from "@/constants/clerk";


const isProtectedRoute = createRouteMatcher(['/reports(.*)','/api(.*)'])

export default clerkMiddleware(
    async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect(); // Protect this route
    }
},{ debug: DEBUG_CLERK_SERVICES === 'YES' })

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always protect API routes
        '/(api|trpc)(.*)',
    ],
};