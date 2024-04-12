import { FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

export const FirebaseAuthSignUp = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("create account ok", userCredential.user);
    return { data: userCredential.user };
  } catch (error) {
    console.log(error);
    return { error: error as FirebaseError };
  }
};

export const firebaseAuthSignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("login ok", userCredential.user);
    return { data: userCredential.user };
  } catch (error) {
    console.log(error);
    return { error: error as FirebaseError };
  }
};

export const firebaseAuthSignOut = async () => {
  try {
    await signOut(auth);
    console.log("sign out ok");
  } catch (error) {
    console.log(error);
  }
};

interface AuthData {
    auth: any; 
    uid: string | null;
  }

export const firebaseAuthCheck = async () :Promise<AuthData> => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          const uid = user.uid;
          unsubscribe();
          resolve({ auth, uid });
        } else {
          console.log("no user");
          resolve({ auth, uid: null });
        }
      },
      reject
    );
  });
};
