import ProtectedRoute from "@/core/auth/ProtectedRoute";
import UserProfileContainer from "@/modules/user/containers/user-profile/UserProfileContainer";
import React from "react";

export default function page() {
  return (
    <main>
      <ProtectedRoute>
        <UserProfileContainer />
      </ProtectedRoute>
    </main>
  );
}
