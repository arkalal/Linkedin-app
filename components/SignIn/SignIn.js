"use client";

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./SignIn.module.scss";
import Image from "next/image";
import { FaGoogle, FaLinkedin } from "react-icons/fa";

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [router, session]);

  return (
    <div className={styles.signIn}>
      <div className={styles.signInContent}>
        <div className={styles.signInLogo}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            onClick={() => router.push("/")}
          />
        </div>

        <div className={styles.signInBox}>
          <h1>
            Get hyper-personalized, ready to publish LinkedIn content in
            minutes.
          </h1>
          <p>
            Discover trends, create viral-worthy content, engage with key
            influencers, and stay consistently active.
          </p>

          <div className={styles.signInButtons}>
            <button
              onClick={() => signIn("linkedin", { callbackUrl: "/dashboard" })}
              className={styles.linkedinBtn}
            >
              <FaLinkedin /> Continue with LinkedIn
            </button>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className={styles.googleBtn}
            >
              <FaGoogle /> Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
