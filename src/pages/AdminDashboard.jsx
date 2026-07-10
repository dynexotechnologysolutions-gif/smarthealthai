
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useTranslation } from "react-i18next";

import {
    collection,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore";


function AdminDashboard() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [warnings, setWarnings] = useState([]);
    const [priorityFacilities, setPriorityFacilities] = useState([]);


    useEffect(() => {

        const q = query(
            collection(db, "facilityReports"),
            orderBy("createdAt", "desc")
        );


        const unsubscribe = onSnapshot(q, (snapshot) => {


            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));


            setReports(data);


            const aiWarnings = [];


            data.forEach(report => {


                if (report.aiRisk === "Critical") {

                    aiWarnings.push({
                        message:
                            `${report.facility} has Critical Risk Alert`
                    });

                }


                if (
                    report.medicine?.currentStock <
                    report.medicine?.minimumStock
                ) {

                    aiWarnings.push({
                        message:
                            `${report.facility} medicine stock is below minimum level`
                    });

                }


            });


            setWarnings(aiWarnings);
            setLoading(false);

            const priority = data.filter(
                report =>
                    report.aiRisk === "Critical" ||
                    report.medicine?.currentStock <
                    report.medicine?.minimumStock ||
                    report.availableBeds < 5
            );

            setPriorityFacilities(priority);

        });


        return () => unsubscribe();


    }, []);



    function getRiskColor(risk) {

        if (risk === "Critical")
            return "#dc2626";


        if (risk === "Attention")
            return "#f59e0b";


        return "#16a34a";

    }



    if (loading) {

        return (

            <div style={{
                padding: "40px",
                fontSize: "20px"
            }}>

                Loading Delhi Health Dashboard...

            </div>

        );

    }



    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f3f6fb",
                padding: "30px",
                fontFamily: "Arial"
            }}
        >


            <header
                style={{
                    background: "#0f3d75",
                    color: "white",
                    padding: "25px",
                    borderRadius: "12px",
                    marginBottom: "25px"
                }}
            >

                <h1>
                    🏥 {t("smartHealth")}
                </h1>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "15px"
                    }}
                >
                    <select
                        value={i18n.language}
                        onChange={changeLanguage}
                        style={{
                            padding: "8px",
                            borderRadius: "6px",
                            fontSize: "16px"
                        }}
                    >
                        <option value="en">English</option>
                        <option value="hi">हिन्दी</option>
                        <option value="ta">தமிழ்</option>
                        <option value="te">తెలుగు</option>
                        <option value="ml">മലയാളം</option>
                        <option value="kn">ಕನ್ನಡ</option>
                    </select>
                </div>

                <h2>
                    {t("government")}
                </h2>


                <h3>
                    {t("department")}
                </h3>


                <p>
                    {t("dashboardTitle")}
                </p>


                <p>
                    {t("liveMonitoringDescription")}
                </p>

            </header>




            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >


                <div className="card">
                    <h2>{t("facilities")}</h2>
                    <h1>{reports.length}</h1>
                </div>


                <div className="card">
                    <h2>🚨  {t("criticalAlerts")}</h2>
                    <h1>
                        {
                            reports.filter(
                                r => r.aiRisk === "Critical"
                            ).length
                        }
                    </h1>
                </div>


                <div className="card">
                    <h2>{t("aiAnalysed")} AI Analysed</h2>
                    <h1>
                        {
                            reports.filter(
                                r => r.status === "completed"
                            ).length
                        }
                    </h1>
                </div>


                <div className="card">
                    <h2>💊 {t("medicineIssues")}</h2>
                    <h1>
                        {
                            reports.filter(
                                r =>
                                    r.medicine?.currentStock <
                                    r.medicine?.minimumStock
                            ).length
                        }
                    </h1>
                </div>


            </div>




            <div
                style={{
                    background: "#fff4f4",
                    border: "2px solid #dc2626",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "30px"
                }}
            >

                <h2 style={{ color: "#dc2626" }}>
                    🚨{t("earlyWarningPanel")}
                </h2>


                {
                    warnings.length === 0 ?

                        (
                            <p>
                                ✅ No active operational alerts.
                            </p>
                        )

                        :

                        warnings.map((warning, index) => (

                            <div
                                key={index}
                                style={{
                                    background: "white",
                                    padding: "12px",
                                    marginTop: "10px",
                                    borderLeft:
                                        "6px solid #dc2626",
                                    borderRadius: "8px"
                                }}
                            >

                                {warning.message}

                            </div>

                        ))

                }


            </div>
            <div
                style={{
                    background: "#fff7ed",
                    border: "2px solid #f97316",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "30px"
                }}
            >

                <h2>
                    🚨 Operational Alerts Panel
                </h2>


                {
                    priorityFacilities.length === 0 ?

                        <p>
                            ✅ All facilities operating normally
                        </p>

                        :

                        priorityFacilities.map(
                            facility => (

                                <div
                                    key={facility.id}
                                    style={{
                                        background: "white",
                                        padding: "15px",
                                        marginTop: "10px",
                                        borderRadius: "8px"
                                    }}
                                >

                                    <h3>
                                        🏥 {facility.facility}
                                    </h3>


                                    <p>
                                        Risk:
                                        <b>
                                            {facility.aiRisk || "Attention"}
                                        </b>
                                    </p>


                                    {
                                        facility.medicine?.currentStock <
                                        facility.medicine?.minimumStock &&

                                        <p style={{ color: "red" }}>
                                            🔴 Medicine will run out soon
                                        </p>

                                    }


                                    {
                                        facility.availableBeds < 5 &&

                                        <p style={{ color: "orange" }}>
                                            ⚠️ Bed capacity shortage
                                        </p>

                                    }


                                    {
                                        facility.doctorPresent === false &&

                                        <p style={{ color: "red" }}>
                                            ⚠️ Doctor unavailable
                                        </p>

                                    }


                                </div>

                            )

                        )

                }

            </div>



            <h2>
                📍 {t("facilityMap")}
            </h2>


            {

                reports.map(report => (

                    <div
                        key={report.id}
                        style={{
                            background: "white",
                            padding: "25px",
                            marginBottom: "20px",
                            borderRadius: "15px",
                            boxShadow:
                                "0 3px 10px rgba(0,0,0,0.1)"
                        }}
                    >


                        <h2>
                            🏥 {report.facility}
                        </h2>


                        <p>
                            <b>District:</b> {report.district || "Delhi"}
                        </p>


                        <p>
                            <b>Health Worker:</b> {report.worker}
                        </p>


                        <p>
                            <b>Patients Today:</b> {report.patientsToday}
                        </p>


                        <p>
                            <b>Available Beds:</b> {report.availableBeds}
                        </p>


                        <p>
                            <b>Doctor Present:</b> {report.doctorPresent}
                        </p>


                        <hr />


                        <h3>
                            💊 Medicine Status
                        </h3>


                        <p>
                            {report.medicine?.name}
                        </p>


                        <p>
                            Stock:
                            {" "}
                            {report.medicine?.currentStock}
                            /
                            {report.medicine?.minimumStock}
                        </p>



                        <hr />


                        <h3>
                            🤖 AI Analysis
                        </h3>



                        <p
                            style={{
                                color: getRiskColor(report.aiRisk),
                                fontSize: "20px",
                                fontWeight: "bold"
                            }}
                        >

                            Risk:
                            {" "}
                            {report.aiRisk || "Pending"}

                        </p>



                        <p>
                            <b>Summary:</b>
                            <br />

                            {
                                report.aiSummary ||
                                "Waiting for Gemini analysis..."
                            }

                        </p>




                        <p>
                            <b>Recommendation:</b>
                            <br />

                            {
                                report.aiRecommendation ||
                                "AI recommendation pending"
                            }

                        </p>




                        <p>
                            Confidence:
                            {" "}
                            {report.confidence || 0}%
                        </p>



                        <hr />


                        <h3>
                            🚨 AI Early Warnings
                        </h3>

                        {
                            report.aiEarlyWarnings?.length > 0 && (

                                <div
                                    style={{
                                        background: "#fee2e2",
                                        border: "2px solid #dc2626",
                                        padding: "15px",
                                        borderRadius: "10px",
                                        marginBottom: "15px"
                                    }}
                                >

                                    <h4>
                                        🔴 Critical Operational Alerts
                                    </h4>


                                    {
                                        report.aiEarlyWarnings.map(
                                            (warning, index) => (

                                                <p key={index}>
                                                    ⚠️ {warning}
                                                </p>

                                            )
                                        )
                                    }


                                </div>

                            )
                        }

                        {

                            report.aiEarlyWarnings?.length > 0 ?

                                report.aiEarlyWarnings.map(
                                    (warning, index) => (

                                        <div
                                            key={index}
                                            style={{
                                                background: "#fff4f4",
                                                borderLeft:
                                                    "5px solid #dc2626",
                                                padding: "10px",
                                                marginBottom: "10px"
                                            }}
                                        >

                                            ⚠️ {warning}

                                        </div>

                                    )

                                )

                                :

                                <p>
                                    No warnings.
                                </p>

                        }




                        <hr />


                        <h3>
                            {t("demandForecast")} (Next 7 Days)
                        </h3>


                        <p>
                            <b>Bed Demand:</b>
                            <br />

                            {
                                report.aiDemandForecast
                                    ?.bedDemand || "N/A"
                            }

                        </p>
                        <hr />

                        <h3>
                            🚚 Smart Resource Redistribution
                        </h3>


                        <p>
                            <b>Priority:</b>
                            <br />

                            {
                                report.aiResourceRedistribution?.priority
                                || "Pending"
                            }

                        </p>


                        <p>
                            <b>Action:</b>
                            <br />

                            {
                                report.aiResourceRedistribution?.action
                                || "Pending"
                            }

                        </p>


                        <hr />


                        <h3>
                            🏙️ District Intervention Priority
                        </h3>


                        <p>
                            {
                                report.aiDistrictPriority
                                || "Pending"
                            }
                        </p>

                        <p>
                            <b>Medicine Demand:</b>
                            <br />

                            {
                                report.aiDemandForecast
                                    ?.medicineDemand || "N/A"
                            }

                        </p>



                        <p>
                            <b>Bed Demand:</b>
                            <br />

                            {
                                report.aiDemandForecast
                                    ?.bedDemand || "N/A"
                            }

                        </p>


                    </div>


                ))

            }


        </div>

    );


}


export default AdminDashboard;
