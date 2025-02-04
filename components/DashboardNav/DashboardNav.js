import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import styles from "./DashboardNav.module.scss";
import { FaLinkedin } from "react-icons/fa";

const DashboardNav = ({ user }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <h1>Post App</h1>
        </div>

        <div className={styles.userSection}>
          <div className={styles.accountInfo}>
            <FaLinkedin className={styles.linkedinIcon} />
            <span>{user.name}</span>
          </div>
          <div className={styles.profileImage}>
            {user.image ? (
              <Image src={user.image} alt={user.name} width={32} height={32} />
            ) : (
              <div className={styles.placeholder}></div>
            )}
          </div>
          <button onClick={() => signOut()} className={styles.signOutBtn}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
