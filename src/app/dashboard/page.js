"use client";

import React from "react";
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

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!session) {
    router.push("/signIn");
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
