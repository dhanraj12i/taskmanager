import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase/firebase-Config";

const singIn = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken as string;
      console.log("token", token);
      sessionStorage.setItem("token", token);
      console.log("result", result);
      return result?.user;
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error({ msg: error.message, code: error.code });
      console.error(credential);
    });
};

const removeSession = async () => {
  try {
    await signOut(auth); // Sign out from Firebase

    // Clear session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    // Optional: Redirect to login page or update state
    window.location.href = "/login"; // Redirect to login page
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

export { singIn, removeSession };
