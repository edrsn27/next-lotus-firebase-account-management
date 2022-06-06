import { app } from "../firebase-config";
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions(app);

export function addAdminRole(uid) {
  return httpsCallable(functions, "addAdminRole")({ uid });
}

