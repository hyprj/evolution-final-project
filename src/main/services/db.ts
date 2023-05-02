import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { firebaseAuth, db } from "./firebase";
import { User } from "../features/auth/store";

export const logOut = () => signOut(firebaseAuth);

export async function getDocument(path: string, ...pathSegments: string[]) {
  const docSnap = await getDoc(doc(db, path, ...pathSegments));
  return docSnap.data();
}

export async function setDocument(
  data: any,
  path: string,
  ...pathSegments: string[]
) {
  return setDoc(doc(db, path, ...pathSegments), data);
}

export async function getUserBalance(uid: string) {
  try {
    const balance = await getDocument("users", uid);
    if (balance) {
      return balance.balance as number;
    }
  } catch (err) {
    console.warn(err);
  }
  return null;
}

export async function setUserBalance(uid: string, amount: number) {
  try {
    console.log(amount);
    setDocument({ balance: amount }, "users", uid);
  } catch (err) {
    console.warn(err);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { displayName, uid } = (
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    ).user;
    return { displayName, uid, email };
  } catch (err) {
    console.warn(err);
    return null;
  }
}

export async function createUser(
  email: string,
  displayName: string,
  password: string
): Promise<User | null> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName });
    const { uid } = userCredential.user;
    setDocument({ balance: 2000 }, "users", uid);
    return { uid, email, displayName, balance: 2000 };
  } catch (err) {
    console.warn(err);
    return null;
  }
}
