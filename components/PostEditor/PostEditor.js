"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./PostEditor.module.scss";
import { FaLinkedin, FaCheckCircle } from "react-icons/fa";
import { useDashboard } from "../../utils/DashboardContext";
import axios from "../../axios/api";

const PostEditor = () => {
  const { data: session } = useSession();
  const {
    postContent,
    setPostContent,
    isPosting,
    setIsPosting,
    publishStatus,
    setPublishStatus,
  } = useDashboard();
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!postContent.trim()) {
      setError("Please enter some content");
      return;
    }

    setIsPosting(true);
    setError("");
    setPublishStatus({ success: false, message: "" });

    try {
      const response = await axios.post("linkedin", {
        text: postContent,
      });

      if (response.data.success) {
        setPublishStatus({
          success: true,
          message: "Successfully published to LinkedIn!",
        });
      }
    } catch (err) {
      console.error("Full error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.details ||
          err.message ||
          "Failed to post to LinkedIn"
      );
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.header}>
        <FaLinkedin className={styles.linkedinIcon} />
        <span>Create LinkedIn Post</span>
      </div>

      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="What would you like to share?"
        className={styles.textarea}
        maxLength={3000}
        disabled={isPosting}
      />

      <div className={styles.footer}>
        <div className={styles.left}>
          <div className={styles.charCount}>{postContent.length}/3000</div>
          {error && <div className={styles.error}>{error}</div>}
          {publishStatus.success && (
            <div className={styles.success}>
              <FaCheckCircle /> {publishStatus.message}
            </div>
          )}
        </div>

        <button
          onClick={handlePost}
          disabled={isPosting || !postContent.trim()}
          className={styles.postButton}
        >
          {isPosting ? "Posting..." : "Post to LinkedIn"}
        </button>
      </div>
    </div>
  );
};

export default PostEditor;
