import { auth } from "./firebase";

export function getCurrentUser() {
  return auth.currentUser;
}

export function isUserSignedIn() {
  return !!auth.currentUser;
}

export function getIdToken() {
  return auth.currentUser ? auth.currentUser.getIdToken() : Promise.resolve(null);
}

export function authStatePromise() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}
