import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { getUserProfile } from "../services/firestore";

function Login() {
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    async function handleLogin(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const credential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const profile = await getUserProfile(credential.user.uid);

            if (profile.role === "health_worker") {
                navigate("/worker");
            } else if (profile.role === "district_admin") {
                navigate("/admin");
            } else {
                setError("Unknown user role.");
            }
        } catch (err) {
            setError("Invalid Email or Password");
        }

        setLoading(false);
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#0f4c81,#1976d2,#42a5f5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Segoe UI",
                padding: "30px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "1000px",
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr",
                    background: "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
                }}
            >
                {/* LEFT PANEL */}

                <div
                    style={{
                        padding: "60px",
                        background:
                            "linear-gradient(180deg,#1565c0,#0d47a1)",
                        color: "white",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "42px",
                            marginBottom: "15px",
                        }}
                    >
                        🏥 {t("smartHealth")}
                    </h1>

                    <h2
                        style={{
                            marginBottom: "5px",
                            fontWeight: "600",
                        }}
                    >
                        {t("government")}
                    </h2>

                    <h3
                        style={{
                            marginTop: 0,
                            marginBottom: "35px",
                            fontWeight: "400",
                        }}
                    >
                        {t("department")}
                    </h3>

                    <div
                        style={{
                            background: "rgba(255,255,255,.15)",
                            padding: "25px",
                            borderRadius: "12px",
                            marginBottom: "30px",
                        }}
                    >
                        <h2
                            style={{
                                marginTop: 0,
                            }}
                        >
                            {t("dashboardTitle")}
                        </h2>

                        <p
                            style={{
                                fontSize: "18px",
                                lineHeight: "32px",
                            }}
                        >
                            {t("liveMonitoringDescription")}
                        </p>
                    </div>

                    <h3>{t("platformFeatures")}</h3>

                    <ul
                        style={{
                            lineHeight: "34px",
                            fontSize: "18px",
                        }}
                    >
                        <li>✔ {t("riskPrediction")}</li>
                        <li>✔ {t("medicineStockMonitoring")}</li>
                        <li>✔ {t("diagnosticAvailability")}</li>
                        <li>✔ {t("patientAnalytics")}</li>
                        <li>✔ {t("bedTracking")}</li>
                        <li>✔ {t("emergencyAlerts")}</li>
                        <li>✔ {t("districtDashboard")}</li>
                        <li>✔ {t("geminiRecommendations")}</li>
                    </ul>
                </div>

                {/* LOGIN PANEL */}

                <div
                    style={{
                        padding: "55px 45px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "20px",
                        }}
                    >
                        <select
                            value={i18n.language}
                            onChange={changeLanguage}
                            style={{
                                padding: "8px",
                                borderRadius: "8px",
                                fontSize: "15px",
                            }}
                        >
                            <option value="en">🇬🇧 English</option>
                            <option value="hi">🇮🇳 हिन्दी</option>
                            <option value="ta">🇮🇳 தமிழ்</option>
                            <option value="te">🇮🇳 తెలుగు</option>
                            <option value="ml">🇮🇳 മലയാളം</option>
                            <option value="kn">🇮🇳 ಕನ್ನಡ</option>
                        </select>
                    </div>

                    <h2
                        style={{
                            marginBottom: "10px",
                            color: "#1565c0",
                        }}
                    >
                        🔐 {t("authorizedLogin")}
                    </h2>

                    <p
                        style={{
                            color: "#666",
                            marginBottom: "35px",
                        }}
                    >
                        {t("loginSubtitle")}
                    </p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder={t("officialEmail")}
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            style={{
                                width: "100%",
                                padding: "14px",
                                marginBottom: "18px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                            }}
                        />

                        <input
                            type="password"
                            placeholder={t("password")}
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            style={{
                                width: "100%",
                                padding: "14px",
                                marginBottom: "25px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                            }}
                        />

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "15px",
                                border: "none",
                                borderRadius: "8px",
                                background: "#1565c0",
                                color: "white",
                                fontSize: "18px",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >
                            {loading
                                ? t("authenticating")
                                : t("login")}
                        </button>
                    </form>

                    {error && (
                        <p
                            style={{
                                color: "red",
                                marginTop: "20px",
                            }}
                        >
                            {error}
                        </p>
                    )}

                    <div
                        style={{
                            marginTop: "45px",
                            borderTop: "1px solid #ddd",
                            paddingTop: "20px",
                            fontSize: "14px",
                            color: "#666",
                        }}
                    >
                        <strong>{t("poweredByTitle")}</strong>

                        <br />

                        {t("poweredBy")}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;