import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASSWORD,
    },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: [process.env.APP_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false,
            },
            phone: {
                type: "string",
                required: false,
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false,
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }) => {
            try {
                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
                const info = await transporter.sendMail({
                    from: '"Prisma Blog" <prismablog@ph.com>',
                    to: user.email,
                    subject: "Please Verify Your Email for Prisma Blog!",
                    html: ` <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">
      
      <h2 style="color:#333;">Verify Your Email</h2>

      <p style="color:#555; font-size:16px;">
        Thanks for signing up for <strong>Prisma Blog</strong>.
        Please verify your email address by clicking the button below.
      </p>

      <div style="text-align:center; margin:30px 0;">
        <a 
          href="${verificationUrl}" 
          style="
            background:#4CAF50;
            color:#ffffff;
            padding:12px 25px;
            text-decoration:none;
            border-radius:5px;
            font-size:16px;
            display:inline-block;
          "
        >
          Verify Email
        </a>
      </div>

      <p style="color:#777; font-size:14px;">
        If the button above doesn't work, copy and paste this link into your browser:
      </p>

      <p style="word-break:break-all; color:#4CAF50;">
        ${verificationUrl}
      </p>

      <hr style="margin:30px 0;" />

      <p style="font-size:12px; color:#999;">
        If you did not create an account, you can safely ignore this email.
      </p>

      <p style="font-size:12px; color:#999;">
        © ${new Date().getFullYear()} Prisma Blog
      </p>

    </div>
  </div>`, // HTML version of the message
                });

                console.log("Message sent:", info.messageId);
            }
            catch (error) {
                console.error("Error sending verification email:", error);
                throw error;
            }
        }
    }
});