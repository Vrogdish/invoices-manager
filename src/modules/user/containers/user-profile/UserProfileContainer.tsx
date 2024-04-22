"use client";

import React, { useState } from "react";
import "./styles.scss";
import ProfileCard from "../../components/profile-card/ProfileCard";
import Button from "@/shared/components/button/Button";
import ProfileUpdateForm from "../../components/profile-update-form/ProfileUpdateForm";

export default function UserProfileContainer() {
  const [showEditor, setShowEditor] = useState(false);
  return (
    <div className="profile">
      <h2>Mes Informations personnelles</h2>
      {!showEditor ? (
        <>
          <ProfileCard />
          <Button onClick={() => setShowEditor(true)} className="update-btn">
            Modifier mes informations
          </Button>{" "}
        </>
      ) : (
        <>
          <ProfileUpdateForm closeEditor={() => setShowEditor(false)} />
        </>
      )}
    </div>
  );
}
