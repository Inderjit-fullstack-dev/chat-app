import { getDatabaseInstance, getFirebaseApp } from "./firbase.services";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { child, get, ref, set } from "firebase/database";

export const registerUser = async (request) => {
  const { firstName, lastName, email, password } = request;

  const app = getFirebaseApp();
  const auth = getAuth(app);

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = result.user;
    const { idToken, refreshToken } = result._tokenResponse;

    const userData = await createUser(
      firstName,
      lastName,
      email,
      uid,
      refreshToken
    );

    return { ...userData, token: idToken };
  } catch (error) {
    let message = "something went wrong";
    if (error.code === "auth/email-already-in-use") {
      message = "This email is already in use";
    }
    throw new Error(message);
  }
};

export const login = async (request) => {
  const { email, password } = request;

  const app = getFirebaseApp();
  const auth = getAuth(app);
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (result) {
      const { uid } = result.user;
      const { idToken, refreshToken } = result._tokenResponse;
      const user = await getUserById(uid);
      return {
        ...user,
        token: idToken,
        refreshToken,
        createdAt: new Date(user.createdAt).toISOString(),
      };
    }
  } catch (error) {
    let message = "Something went wrong.";
    if (error.code === "auth/invalid-credential") {
      message = "Invalid credentials.";
    }
    throw new Error(message);
  }
};

const createUser = async (firstName, lastName, email, userId, refreshToken) => {
  const db = getDatabaseInstance();
  const dbRef = ref(db, `users/${userId}`);
  const userData = {
    firstName,
    lastName,
    fullName: `${firstName}_${lastName}`.toLowerCase(),
    email,
    userId,
    refreshToken,
    createdAt: new Date().toISOString(),
  };

  try {
    await set(dbRef, userData);
    return userData;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  const db = getDatabaseInstance();
  const dbRef = ref(db);
  const childRef = child(dbRef, `users/${userId}`);

  try {
    const snapshot = await get(childRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("No user found!");
    }
  } catch (error) {
    throw error;
  }
};
