import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import healthBg from "../assets/health-bg.jpg";
import {
    getUserProfile,
    submitFacilityReport,
} from "../services/firestore";

function HealthWorker() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    const [profile, setProfile] = useState(null);

    const [patientsToday, setPatientsToday] = useState("");
    const [availableBeds, setAvailableBeds] = useState("");
    const [doctorPresent, setDoctorPresent] = useState("Yes");

    const [medicineName, setMedicineName] = useState("");
    const [currentStock, setCurrentStock] = useState("");
    const [minimumStock, setMinimumStock] = useState("");
    const [testName, setTestName] = useState("CBC");
    const [testAvailability, setTestAvailability] = useState("Available");

    const [emergencyLevel, setEmergencyLevel] = useState("Normal");
    const [note, setNote] = useState("");

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            try {

                if (!user) {
                    return;
                }

                const data = await getUserProfile(user.uid);

                setProfile(data);

            } catch (err) {

                console.error(err);

                alert(err.message);

            }

        });

        return () => unsubscribe();

    }, []);

    async function handleSubmit() {
        if (!profile) return;

        try {
            setSubmitting(true);

            const reportId = await submitFacilityReport({
                facility: profile.facility,
                district: profile.district,
                worker: profile.name,

                language: i18n.language,

                patientsToday: Number(patientsToday),
                availableBeds: Number(availableBeds),

                doctorPresent,

                medicine: {
                    name: medicineName,
                    currentStock: Number(currentStock),
                    minimumStock: Number(minimumStock),
                },

                testAvailability: {
                    name: testName,
                    status: testAvailability,
                },

                emergencyLevel,

                note,

                status: "pending_ai",
            });
            console.log("Report created:", reportId);
            alert("✅ Report submitted successfully!");

            setPatientsToday("");
            setAvailableBeds("");
            setDoctorPresent("Yes");

            setMedicineName("");
            setCurrentStock("");
            setMinimumStock("");
            setTestName("CBC");
            setTestAvailability("Available");
            setEmergencyLevel("Normal");
            setNote("");

        } catch (err) {
            console.error(err);
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    if (!profile) {
        return (
            <div style={{ padding: "40px" }}>
                <h2>Loading profile...</h2>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundImage: `linear-gradient(rgba(245,248,252,.92), rgba(245,248,252,.92)), url(${healthBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                padding: "40px 0",
            }}
        >
            <div
                style={{
                    maxWidth: "1400px",
                    margin: "40px auto",
                    padding: "28px",
                    fontFamily: "Arial",
                }}
            >
                <div
                    style={{
                        background: "linear-gradient(135deg,#1565C0,#0D47A1)",
                        color: "white",
                        padding: "30px",
                        borderRadius: "15px",
                        marginBottom: "25px",
                        boxShadow: "0 8px 20px rgba(0,0,0,.2)",
                    }}
                >
                    <h1 style={{ margin: 0 }}>
                        🏥 {t("smartHealth")}
                    </h1>

                    <h2 style={{ marginTop: 10 }}>
                        Government of NCT of Delhi
                    </h2>

                    <h3 style={{ fontWeight: "400" }}>
                        {t("department")}
                    </h3>

                    <h2>
                        Delhi District Health Reporting Portal
                    </h2>

                    <p>
                        AI Enabled Public Healthcare Monitoring System
                    </p>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: "#E8F5E9",
                        padding: "18px",
                        borderRadius: "15px",
                        marginBottom: "30px",
                        fontWeight: "bold",
                        fontSize: "18px",
                    }}
                >
                    <div>🟢 {t("firebaseConnected")}</div>
                    <div>🤖 {t("geminiActive")}</div>
                    <div>⚡ {t("liveMonitoring")}</div>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: "20px",
                        marginBottom: "30px",
                    }}
                >

                    <div
                        style={{
                            background: "linear-gradient(135deg,#ffffff,#f8fbff)",
                            padding: "28px",
                            borderRadius: "18px",
                            boxShadow: "0 10px 25px rgba(21,101,192,.18)"
                        }}
                    >
                        <h3>{t("name")}</h3>
                        <h2
                            style={{
                                color: "#1565C0",
                                fontSize: "30px",
                                marginTop: 10
                            }}
                        >
                            {t(profile.worker || profile.name)}
                        </h2>
                    </div>

                    <div
                        style={{
                            background: "linear-gradient(135deg,#ffffff,#f8fbff)",
                            padding: "28px",
                            borderRadius: "18px",
                            boxShadow: "0 10px 25px rgba(21,101,192,.18)"
                        }}
                    >
                        <h3>🏥 {t("facility")}</h3>
                        <h2
                            style={{
                                color: "#0D47A1",
                                fontSize: "28px"
                            }}
                        >
                            {t(profile.facility)}
                        </h2>
                    </div>

                    <div
                        style={{
                            background: "linear-gradient(135deg,#ffffff,#f8fbff)",
                            padding: "28px",
                            borderRadius: "18px",
                            boxShadow: "0 10px 25px rgba(21,101,192,.18)"
                        }}
                    >
                        <h3>📍 {t("district")}</h3>
                        <h2
                            style={{
                                color: "#2E7D32",
                                fontSize: "28px"
                            }}
                        >
                            {t(profile.district)}
                        </h2>
                    </div>

                </div>

                <h2
                    style={{
                        color: "#1565C0",
                        marginTop: 35
                    }}
                >
                    📊 {t("dailyOperations")}
                </h2>

                <input
                    type="number"
                    placeholder={t("patientsToday")}
                    value={patientsToday}
                    onChange={(e) => setPatientsToday(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                />

                <input
                    type="number"
                    placeholder={t("availableBeds")}
                    value={availableBeds}
                    onChange={(e) => setAvailableBeds(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                />

                <select
                    value={doctorPresent}
                    onChange={(e) => setDoctorPresent(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <option>{t("yes")}</option>
                    <option>{t("no")}</option>
                </select>

                <h2 style={{ color: "#1565C0" }}>
                    💊 {t("medicineInventory")}
                </h2>


                <select
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <option value="">Select Medicine</option>

                    <option>Paracetamol</option>
                    <option>Amoxicillin</option>
                    <option>Azithromycin</option>
                    <option>Cefixime</option>
                    <option>Ceftriaxone</option>
                    <option>Doxycycline</option>
                    <option>Metronidazole</option>
                    <option>Ciprofloxacin</option>
                    <option>Levofloxacin</option>
                    <option>Ofloxacin</option>

                    <option>Ibuprofen</option>
                    <option>Aspirin</option>
                    <option>Diclofenac</option>
                    <option>Tramadol</option>
                    <option>Morphine</option>

                    <option>ORS Packets</option>
                    <option>IV Fluids</option>
                    <option>Normal Saline</option>
                    <option>Ringer Lactate</option>
                    <option>Dextrose</option>

                    <option>Insulin</option>
                    <option>Metformin</option>
                    <option>Glimepiride</option>

                    <option>Amlodipine</option>
                    <option>Losartan</option>
                    <option>Atenolol</option>
                    <option>Enalapril</option>

                    <option>Atorvastatin</option>
                    <option>Rosuvastatin</option>

                    <option>Omeprazole</option>
                    <option>Pantoprazole</option>
                    <option>Rabeprazole</option>

                    <option>Ondansetron</option>
                    <option>Domperidone</option>

                    <option>Salbutamol Inhaler</option>
                    <option>Budesonide Inhaler</option>

                    <option>Hydrocortisone</option>
                    <option>Dexamethasone</option>
                    <option>Prednisolone</option>

                    <option>Vitamin C</option>
                    <option>Vitamin D3</option>
                    <option>Iron Tablets</option>
                    <option>Folic Acid</option>
                    <option>Calcium Tablets</option>

                    <option>Anti Snake Venom</option>
                    <option>Anti Rabies Vaccine</option>
                    <option>Tetanus Vaccine</option>
                    <option>BCG Vaccine</option>
                    <option>MMR Vaccine</option>
                    <option>Polio Vaccine</option>

                    <option>Dengue Test Kit</option>
                    <option>Malaria Test Kit</option>
                    <option>Rapid Glucose Kit</option>
                    <option>Nebulizer Solution</option>
                    <option>Adrenaline Injection</option>
                    <option>Heparin</option>
                    <option>Warfarin</option>
                    <option>Clopidogrel</option>
                    <option>Nitroglycerin</option>
                </select>


                <input
                    type="number"
                    placeholder={t("currentStock")}
                    value={currentStock}
                    onChange={(e) => setCurrentStock(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                />

                <input
                    type="number"
                    placeholder={t("minimumStock")}
                    value={minimumStock}
                    onChange={(e) => setMinimumStock(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                    }}
                />

                <hr />

                <h2 style={{ color: "#1565C0" }}>
                    🧪 {t("diagnosticTests")}
                </h2>

                <label>Select Test</label>

                <select
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                    }}
                >
                    <option>CBC</option>
                    <option>Dengue NS1</option>
                    <option>Malaria Rapid Test</option>
                    <option>Typhoid Test</option>
                    <option>COVID-19 RT-PCR</option>
                    <option>COVID Rapid Antigen</option>
                    <option>Blood Sugar</option>
                    <option>HbA1c</option>
                    <option>Liver Function Test (LFT)</option>
                    <option>Kidney Function Test (KFT)</option>
                    <option>Urine Routine</option>
                    <option>Pregnancy Test</option>
                    <option>ECG</option>
                    <option>X-Ray</option>
                    <option>Ultrasound</option>
                    <option>CT Scan</option>
                    <option>MRI Scan</option>
                    <option>Blood Culture</option>
                    <option>Sputum Test</option>
                    <option>HIV Test</option>
                </select>

                <label>Availability Status</label>

                <select
                    value={testAvailability}
                    onChange={(e) => setTestAvailability(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <option>Available</option>
                    <option>Limited</option>
                    <option>Unavailable</option>
                </select>

                <h2 style={{ color: "#1565C0" }}>
                    🚨 {t("emergencyMonitoring")}
                </h2>

                <select
                    value={emergencyLevel}
                    onChange={(e) => setEmergencyLevel(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <option>Normal</option>
                    <option>Attention</option>
                    <option>Critical</option>
                </select>

                <h2 style={{ color: "#1565C0" }}>
                    📝 {t("situationReport")}
                </h2>

                <textarea
                    rows={5}
                    placeholder={t("describeSituation")}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                    }}
                />

                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{
                        width: "100%",
                        background: "#1565C0",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        padding: "18px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    {submitting
                        ? `🚀 ${t("uploadingReport")}`
                        : `🚀 ${t("submitReport")}`}
                </button>

                <hr style={{ marginTop: "50px" }} />

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "#777"
                    }}
                >
                    <h3>{t("government")}</h3>

                    <p>Smart Health AI</p>

                    <p>
                        {t("poweredBy")}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default HealthWorker;