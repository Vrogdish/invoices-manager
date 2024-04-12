import {
  ProductFormInterface,
  ProductInterface,
} from "@/core/interfaces/product.interface";
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

export const firestoreAddProduct = async (product: ProductFormInterface) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name: product.name,
      price: product.price,
      description: product.description ,
      reference: product.reference ,
      userId: product.userId,
    });
    console.log("Document written with ID: ", docRef.id);
    return { data: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { error: error as FirebaseError };
  }
};

export const getAllProducts = async (userId: string) => {
  try {
    const products: ProductInterface[] = [];
    const q = query(collection(db, "products"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        description: doc.data().description,
        reference: doc.data().reference,
        userId: doc.data().userId,
      });
    });
    return { data: products };
  } catch (error) {
    console.error("Error getting documents: ", error);
    return { error: error as FirebaseError };
  }
};

export const firestoreRemoveProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, "products", id));
    return { data: "Document deleted" };
  } catch (error) {
    return { error: error as FirebaseError };
  }
};
