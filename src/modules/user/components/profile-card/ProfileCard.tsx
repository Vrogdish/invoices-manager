"use client"

import React from 'react'
import "./styles.scss";
import { useAuthStore } from '@/core/store/AuthStore';

export default function ProfileCard() {
    const { user } = useAuthStore();

  return (
      <div className="card">
      <div className="item">
        <p>Entreprise :</p>
        <p>{user?.company || "-"}</p>
      </div>
      <div className="item">
        <p>Civilité :</p>
        <p>{user?.civility || "-"}</p>
      </div>
      <div className="item">
        <p>Nom :</p>
        <p>{user?.lastName || "-"}</p>
      </div>
      <div className="item">
        <p>Prénom :</p>
        <p>{user?.firstName}</p>
      </div>
      <div className="item">
        <p>Email :</p>
        <p>{user?.email || "-"}</p>
      </div>
      <div className="item">
        <p>Téléphone :</p>
        <p>{user?.phoneNumber || "-"}</p>
      </div>
      <div className="item">
        <p>Adresse :</p>
        <p>{user?.address || "-"}</p>
      </div>
      <div className="item">
        <p>Ville :</p>
        <p>{user?.city || "-"}</p>
      </div>
      <div className="item">
        <p>Code postal :</p>
        <p>{user?.postalCode || "-"}</p>
      </div>
      <div className="item">
        <p>Pays :</p>
        <p>{user?.country || "-"}</p>
      </div>
    </div>
  
  )
}
