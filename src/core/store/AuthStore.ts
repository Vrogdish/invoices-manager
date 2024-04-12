import { create } from "zustand";
import { UserProfileInterface } from "../interfaces/userProfile.interface";
import { FirebaseError } from "firebase/app";
import {
  firestoreAddUserProfile,
  firestoreGetUserProfile,
} from "../api/userProfileApi";
import {
  FirebaseAuthSignUp,
  firebaseAuthSignIn,
  firebaseAuthSignOut,
} from "../auth/firebaseAuth";
import { User } from "firebase/auth";

interface AuthState {
  loading: boolean;
  error: FirebaseError | string | null;
  user: UserProfileInterface | null;

  loadProfile: (uid: string) => Promise<void>;
  createProfile: (
    profilData: UserProfileInterface,
    user: User
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (user: UserProfileInterface, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  loading: false,
  error: null,
  user: null,
  loadProfile: async (uid) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const response = await firestoreGetUserProfile(uid);
      if (response.error) {
        set((state) => ({ ...state, error: response.error, loading: false }));
      } else {
        set((state) => ({ ...state, user: response.data, loading: false }));
        console.log("connexion réussie");
      }
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors du chargement du profil.",
        loading: false,
      }));
    }
  },
  createProfile: async (profileData, user) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const response = await firestoreAddUserProfile(profileData, user);
      if (response.error) {
        set((state) => ({ ...state, error: response.error, loading: false }));
      } else {
        await get().loadProfile(user.uid);
        set((state) => ({ ...state, loading: false }));
      }
    } catch (error) {}
  },
  signIn: async (email, password) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const response = await firebaseAuthSignIn(email, password);
      if (response.error) {
        set((state) => ({ ...state, error: response.error, loading: false }));
      } else {
        await get().loadProfile(response.data.uid);
      }
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors de la connexion.",
        loading: false,
      }));
    }
  },
  signUp: async (user, password) => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      const auth = await FirebaseAuthSignUp(user.email, password);
      if (auth.error) {
        set((state) => ({ ...state, error: auth.error, loading: false }));
      } else {
        await get().createProfile(user, auth.data);
      }
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors de l'inscription.",
        loading: false,
      }));
    }
  },
  signOut: async () => {
    try {
      set((state) => ({ ...state, loading: true, error: null }));
      await firebaseAuthSignOut();
      set((state) => ({ ...state, user: null, loading: false }));
    } catch (error) {
      set((state) => ({
        ...state,
        error: "Une erreur s'est produite lors de la déconnexion.",
        loading: false,
      }));
    }
  },
}));
