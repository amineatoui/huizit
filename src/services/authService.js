import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const logInWithEmailAndPassword = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        resolve("success");
      });
    } catch (err) {
      reject(err.message);
    }
  });
};
