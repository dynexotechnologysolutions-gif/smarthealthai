import { db } from "../firebase";

import {
    doc,
    getDoc,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";


// =============================
// Get logged-in user profile
// =============================
export async function getUserProfile(uid) {

    const userRef = doc(db, "users", uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        throw new Error("User profile not found.");
    }

    return snapshot.data();
}



// =============================
// Submit Health Worker Report
// =============================
export async function submitFacilityReport(report) {

    // Save report
    const docRef = await addDoc(
        collection(db, "facilityReports"),
        {
            ...report,
            createdAt: serverTimestamp(),
        }
    );

    console.log("✅ Report Saved:", docRef.id);

    // Automatically trigger Gemini AI
    try {

        const response = await fetch(
            "http://127.0.0.1:5000/analyze-pending",
            {
                method: "GET",
            }
        );

        const result = await response.json();

        console.log("🤖 Gemini Trigger:", result);

    } catch (err) {

        console.error("❌ Failed to trigger Gemini:", err);

    }

    return docRef.id;
}



// =============================
// Real-time Admin Dashboard
// =============================
export function listenToFacilityReports(callback) {

    const q = query(
        collection(db, "facilityReports"),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {

        const reports = snapshot.docs.map((doc) => ({

            id: doc.id,

            ...doc.data(),

        }));

        callback(reports);

    });

}