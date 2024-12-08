
import { IronSession } from "iron-session";

export const sessionOptions = {
    password: process.env.SESSION_SECRET, // Use a secure, random string stored in .env.local
    cookieName: "anonymous_session",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    },
};
