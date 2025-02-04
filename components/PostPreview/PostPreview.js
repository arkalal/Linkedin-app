"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./PostPreview.module.scss";
import { FaLinkedin, FaThumbsUp, FaComment } from "react-icons/fa";
import { useDashboard } from "../../utils/DashboardContext";

const PostPreview = () => {
  const { data: session } = useSession();
  const { postContent } = useDashboard();

  return (
    <div className={styles.preview}>
      <div className={styles.header}>
        <h3>Post Preview</h3>
      </div>

      <div className={styles.linkedinPost}>
        <div className={styles.postHeader}>
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={48}
              height={48}
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.profilePlaceholder} />
          )}

          <div className={styles.userInfo}>
            <div className={styles.name}>{session?.user?.name}</div>
            <div className={styles.connection}>
              <FaLinkedin className={styles.linkedinIcon} />
              LinkedIn
            </div>
          </div>
        </div>

        <div className={styles.postContent}>
          {postContent || "Write your post in the editor to see a preview here"}
        </div>

        <div className={styles.postFooter}>
          <div className={styles.engagement}>
            <span>
              <FaThumbsUp />0 Likes
            </span>
            <span>
              <FaComment />0 Comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
