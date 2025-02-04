"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { DashboardProvider } from "../../../utils/DashboardContext";
import DashboardNav from "../../../components/DashboardNav/DashboardNav";
import PostEditor from "../../../components/PostEditor/PostEditor";
import PostPreview from "../../../components/PostPreview/PostPreview";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signIn");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardProvider>
      <div className={styles.dashboard}>
        <DashboardNav user={session.user} />
        <main className={styles.content}>
          <div className={styles.editorSection}>
            <PostEditor />
          </div>
          <div className={styles.previewSection}>
            <PostPreview />
          </div>
        </main>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
