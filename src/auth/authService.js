import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  reload,
  getIdTokenResult,
} from "firebase/auth";
import { auth } from "./firebase";

export const authService = {
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  onAuthStateChangedListener,
  sendPasswordReset,
  sendVerificationEmail,
  reloadCurrentUser,
  getIdTokenResult,
  updateUserProfile,
};

function signUpWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

function signOutUser() {
  return signOut(auth);
}

function onAuthStateChangedListener(callback) {
  return onAuthStateChanged(auth, callback);
}

function sendPasswordReset(email) {
  return sendPasswordResetEmail(auth, email);
}

function sendVerificationEmail() {
  const user = auth.currentUser;
  if (!user) {
    return Promise.reject(new Error("No authenticated user available."));
  }
  return sendEmailVerification(user);
}

function reloadCurrentUser() {
  const user = auth.currentUser;
  if (!user) {
    return Promise.reject(new Error("No authenticated user available."));
  }
  return reload(user);
}

function updateUserProfile(profile) {
  if (!auth.currentUser) {
    return Promise.reject(new Error("No authenticated user available."));
  }
  return updateProfile(auth.currentUser, profile);
}
