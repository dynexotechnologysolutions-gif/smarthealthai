import { useEffect, useState } from "react";
import { db } from "../firebase";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "firebase/firestore";


function AdminDashboard() {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);


    async function loadReports() {

        try {

            const q = query(
                collection(db, "facilityReports"),
                orderBy("createdAt", "desc")
            );


            const snapshot = await getDocs(q);


            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));


            setReports(data);


        } catch (error) {

            console.error(
                "Failed loading reports:",
                error
            );

        }
        finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        loadReports();

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
                    🏥 Smart Health AI
                </h1>

                <h2>
                    Government of NCT of Delhi
                </h2>

                <h3>
                    Department of Health & Family Welfare
                </h3>

                <p>
                    Delhi District Health Monitoring Dashboard
                </p>

                <p>
                    Live AI Monitoring of Hospitals, CHCs and PHCs across all 13 districts
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
                    <h2>
                        🏥 Facilities
                    </h2>
                    <h1>
                        {reports.length}
                    </h1>
                </div>


                <div className="card">
                    <h2>
                        🚨 Critical Alerts
                    </h2>
                    <h1>
                        {
                            reports.filter(
                                r => r.aiRisk === "Critical"
                            ).length
                        }
                    </h1>
                </div>


                <div className="card">
                    <h2>
                        🤖 AI Analysed
                    </h2>
                    <h1>
                        {
                            reports.filter(
                                r => r.status === "completed"
                            ).length
                        }
                    </h1>
                </div>


                <div className="card">
                    <h2>
                        💊 Medicine Issues
                    </h2>
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




            <h2>
                📍 Facility Intelligence Map
            </h2>



            <div
                style={{
                    display: "grid",
                    gap: "20px"
                }}
            >


                {
                    reports.map(report => (


                        <div
                            key={report.id}
                            style={{
                                background: "white",
                                padding: "25px",
                                borderRadius: "15px",
                                boxShadow:
                                    "0 3px 10px rgba(0,0,0,0.1)"
                            }}
                        >


                            <h2>
                                🏥 {report.facility}
                            </h2>


                            <p>
                                <b>District:</b>{" "}
                                {report.district || "Delhi"}
                            </p>


                            <p>
                                <b>Health Worker:</b>{" "}
                                {report.worker}
                            </p>


                            <p>
                                <b>Patients Today:</b>{" "}
                                {report.patientsToday}
                            </p>


                            <p>
                                <b>Available Beds:</b>{" "}
                                {report.availableBeds}
                            </p>


                            <p>
                                <b>Doctor Present:</b>{" "}
                                {report.doctorPresent}
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
                                🤖 Gemini AI Analysis
                            </h3>


                            <p
                                style={{
                                    color: getRiskColor(
                                        report.aiRisk
                                    ),
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
                                <b>
                                    Recommendation:
                                </b>
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


                        </div>


                    ))
                }


            </div>


        </div>

    );

}


export default AdminDashboard;