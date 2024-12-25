// 'use server'
//
// import jwt from 'jsonwebtoken';
// import { currentUser } from '@clerk/nextjs/server';
//
// const SECRET_KEY = process.env.CLERK_SECRET_JWT_TOKEN; // Replace with a strong secret key
//
// const handler = async (req, res)=> {
//     // if (req.method !== 'POST') {
//     //     return res.status(405).json({ error: 'Method not allowed' });
//     // }
//
//     try {
//         const user = await currentUser(); // Get the currently logged-in user via Clerk
//
//         // Define custom payload for JWT
//         const payload = {
//             id: user.id,
//             email: user.emailAddresses[0]?.emailAddress,
//             role: user.publicMetadata?.role || 'user', // Add role or any custom claims
//         };
//
//         // Generate a JWT
//         const token = jwt.sign(payload, SECRET_KEY);
//
//         return Response.json({status: 200,token});
//     } catch (error) {
//         console.error('Error generating token:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// }
//
// export const GET = handler;
