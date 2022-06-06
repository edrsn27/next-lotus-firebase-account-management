import { app } from "../firebase-config";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app);

export function addAdminRole(uid) {
  return httpsCallable(functions, "addAdminRole")({ uid });
}

export function disableAccount(uid) {
  return httpsCallable(functions, "disableAccount")({ uid });
}

export function enableAccount(uid) {
    return httpsCallable(functions, "enableAccount")({ uid });
  }
