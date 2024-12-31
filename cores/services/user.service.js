import { getDatabaseInstance, getFirebaseApp } from "./firbase.services";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
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
    console.log("User data saved successfully:", userData);
  } catch (error) {
    throw error;
  }
};
