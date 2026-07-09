import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

/**
 * ROLE PERMISSIONS MAP
 */
const roles = {
  Administrator: [
    "dashboard",
    "users",
    "userlist",
    "customers",
    "suppliers",
    "invoices",
    "ledger",
    "reports",
    "journallist",
    "journalentry",
  ],

  Accountant: [
    "dashboard",
    "customers",
    "suppliers",
    "invoices",
    "ledger",
    "reports",
    "journallist",
    "journalentry",
  ],

  Sales: [
    "dashboard",
    "customers",
    "invoices"
  ],

  Cashier: [
    "dashboard",
    "invoices"
  ],

  Auditor: [
    "dashboard",
    "reports"
  ]
};

/**
 * GET CURRENT USER ROLE
 */
export async function getUserRole(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data().role;
}

/**
 * CHECK ACCESS
 */
export async function canAccess(moduleName) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = "login.html";
        return;
      }

      const role = await getUserRole(user.uid);

      if (!role) {
        resolve(false);
        return;
      }

      const allowed = roles[role] || [];
      resolve(allowed.includes(moduleName));
    });
  });
}

/**
 * PROTECT PAGE
 */
export async function protectPage(moduleName) {
  const allowed = await canAccess(moduleName);

  if (!allowed) {
    alert("Access denied");
    window.location.href = "dashboard.html";
  }
}