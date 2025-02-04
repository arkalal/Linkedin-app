"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./PostEditor.module.scss";
import { FaLinkedin } from "react-icons/fa";
import { useDashboard } from "../../utils/DashboardContext";

const PostEditor = () => {
  const { data: session } = useSession();
  const { postContent, setPostContent, isPosting, setIsPosting } =
    useDashboard();
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!postContent.trim()) {
      setError("Please enter some content");
      return;
    }

    setIsPosting(true);
    setError("");

    try {
      const response = await fetch("/api/linkedin/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: postContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to post");
      }

      setPostContent("");
      // You could add a success notification here
    } catch (err) {
      setError("Failed to post to LinkedIn. Please try again.");
      console.error("Posting error:", err);
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
        <div className={styles.charCount}>{postContent.length}/3000</div>

        {error && <div className={styles.error}>{error}</div>}

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
