import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import { getUserProfile } from "../services/firestore";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                        🏥 Smart Health AI
                    </h1>

                    <h2
                        style={{
                            marginBottom: "5px",
                            fontWeight: "600",
                        }}
                    >
                        Government of NCT of Delhi
                    </h2>

                    <h3
                        style={{
                            marginTop: 0,
                            marginBottom: "35px",
                            fontWeight: "400",
                        }}
                    >
                        Department of Health & Family Welfare
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
                            Delhi District Health Monitoring Dashboard
                        </h2>

                        <p
                            style={{
                                fontSize: "18px",
                                lineHeight: "32px",
                            }}
                        >
                            Live AI Monitoring of Government Hospitals,
                            Community Health Centres (CHCs) and
                            Primary Health Centres (PHCs)
                            across all 13 districts of Delhi.
                        </p>
                    </div>

                    <h3>Platform Features</h3>

                    <ul
                        style={{
                            lineHeight: "34px",
                            fontSize: "18px",
                        }}
                    >
                        <li>✔ AI-powered Risk Prediction</li>
                        <li>✔ Medicine Stock Monitoring</li>
                        <li>✔ Diagnostic Test Availability</li>
                        <li>✔ Patient Footfall Analytics</li>
                        <li>✔ Bed Occupancy Tracking</li>
                        <li>✔ Emergency Alerts</li>
                        <li>✔ District-Level Live Dashboard</li>
                        <li>✔ Google Gemini AI Recommendations</li>
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
                    <h2
                        style={{
                            marginBottom: "10px",
                            color: "#1565c0",
                        }}
                    >
                        🔐 Authorized Login
                    </h2>

                    <p
                        style={{
                            color: "#666",
                            marginBottom: "35px",
                        }}
                    >
                        Government Health Worker / District Administrator
                    </p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Official Email"
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
                            placeholder="Password"
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
                                ? "Authenticating..."
                                : "Login"}
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
                        <strong>Powered By</strong>

                        <br />

                        Firebase Authentication • Cloud Firestore •
                        Google Gemini AI
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;