import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase.config";
import { FirebaseError } from "firebase/app";
import { CustomerFormInterface, CustomerInterface } from "../interfaces/customer.interface";

export const firestoreAddCustomer = async (customer: CustomerFormInterface) => {
  try {
    const docRef = await addDoc(collection(db, "customers"), {
      company: customer.company,
      civility: customer.civility,
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      postalCode: customer.postalCode,
      locality: customer.locality,
      userId: customer.userId,
    });
    console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { error: error as FirebaseError };
  }
};

export const getAllCustomers = async (userId: string) => {
  try {
    const customers: CustomerInterface[] = [];
    const q = query(collection(db, "customers"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      customers.push({
        id: doc.id,
        company: doc.data().company,
        civility: doc.data().civility,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        email: doc.data().email,
        phone: doc.data().phone,
        address: doc.data().address,
        postalCode: doc.data().postalCode,
        locality: doc.data().locality,
        userId: doc.data().userId,
      });
    });
    return { data: customers };
  } catch (error) {
    console.error("Error getting documents: ", error);
    return { error: error as FirebaseError };
  }
};

export const firestoreRemoveCustomer = async (id: string) => {
  try {
    await deleteDoc(doc(db, "customers", id));
    return { data: "Document deleted" };
  } catch (error) {
    console.error("Error removing document: ", error);
    return { error: error as FirebaseError };
  }
};
