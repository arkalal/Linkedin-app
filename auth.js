import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import User from "./models/User";
import connectMongoDB from "./utils/mongoDB";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email w_member_social",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "linkedin") {
        token.accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user, account }) {
      try {
        await connectMongoDB();
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          existingUser.name = user.name;
          existingUser.image = user.image;
          existingUser.linkedInConnected = true;
          await existingUser.save();
        } else {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "linkedin",
            linkedInConnected: true,
          });
        }
        return true;
      } catch (error) {
        console.error("SignIn Error:", error);
        return false;
      }
    },
  },
  //   pages: {
  //     signIn: "/sign-in",
  //   },
});
