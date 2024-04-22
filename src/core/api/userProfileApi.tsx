import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { UserProfileFormInterface, UserProfileInterface } from "../interfaces/userProfile.interface";
import { db } from "../config/firebase.config";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";
import { profile } from "console";

export const firestoreAddUserProfile = async (userProfile: UserProfileInterface, user:User) => {
    try {
        const docRef = await addDoc(collection(db, "userProfile"), {
            uid: user.uid,
            company: userProfile.company || "",
            civility: userProfile.civility,
            firstname: userProfile.firstName,
            lastname: userProfile.lastName,
            imageUrl: user.photoURL || "",
            email: userProfile.email,
            phoneNumber: userProfile.phoneNumber || "",
            address: userProfile.address || "",
            city: userProfile.city || "",
            postalCode: userProfile.postalCode || "",
            country: userProfile.country || "",
            createdAt: Date.now(),
            
        });
        console.log("Document written with ID: ", docRef.id);
        return { data: docRef.id };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { error: error as FirebaseError };
    }
}

export const firestoreGetUserProfile = async (uid: string) => {
    try {
        const user: UserProfileInterface[] = [];
        const q = query(collection(db, "userProfile"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          user.push({
            id: doc.id,
            uid: doc.data().uid,
            company: doc.data().company,
            civility: doc.data().civility,
            firstName: doc.data().firstname,
            lastName: doc.data().lastname,
            imageUrl: doc.data().imageUrl,
            email: doc.data().email,
            phoneNumber: doc.data().phoneNumber ,
            address: doc.data().address ,
            city: doc.data().city ,
            postalCode: doc.data().postalCode  ,
            country: doc.data().country , 
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
            });
        });
        return { data: user[0] };
      } catch (error) {
        console.error("Error getting documents: ", error);
        return { error: error as FirebaseError };
      }
    }

export const firestoreUpdateUserProfile = async (userProfile: UserProfileFormInterface, profileID: string) => {
    try {
        const userRef = doc(db, "userProfile", profileID);
        await updateDoc(userRef, {
            company: userProfile.company || "",
            civility: userProfile.civility,
            firstname: userProfile.firstName,
            lastname: userProfile.lastName,
            imageUrl: userProfile.imageUrl,
            phoneNumber: userProfile.phoneNumber || "",
            address: userProfile.address || "",
            city: userProfile.city || "",
            postalCode: userProfile.postalCode || "",
            country: userProfile.country || "",
            updatedAt: Date.now(),
        });
        console.log("Document updated with ID: ", userRef.id);
        return { data: userRef.id };
    } catch (error) {
        console.error("Error updating document: ", error);
        return { error: error as FirebaseError };
    }
}