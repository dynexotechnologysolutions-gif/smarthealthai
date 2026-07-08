import { useEffect, useState } from "react";
import { listenToFacilityReports } from "../services/firestore";

function DistrictAdmin() {

    const [reports, setReports] = useState([]);

    useEffect(() => {

        const unsubscribe = listenToFacilityReports((data) => {
            setReports(data);
        });

        return () => unsubscribe();

    }, []);


    const critical = reports.filter(
        (r) => r.aiRisk === "Critical"
    ).length;


    const attention = reports.filter(
        (r) => r.aiRisk === "Attention"
    ).length;


    const stable = reports.filter(
        (r) => r.aiRisk === "Stable"
    ).length;



    return (

        <div
            style={{
                maxWidth: "1100px",
                margin: "30px auto",
                padding: "20px",
                fontFamily: "Arial"
            }}
        >

            <h1>
                📊 District Admin Dashboard
            </h1>

            <p>
                Live AI Monitoring Dashboard
            </p>


            {/* SUMMARY CARDS */}

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <Card
                    title="🚨 Critical"
                    value={critical}
                />

                <Card
                    title="⚠️ Attention"
                    value={attention}
                />

                <Card
                    title="🟢 Stable"
                    value={stable}
                />

            </div>



            <h2>
                Live Facility Reports
            </h2>


            {
                reports.map((report) => (

                    <div
                        key={report.id}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            padding: "20px",
                            marginBottom: "20px"
                        }}
                    >

                        <h2>
                            🏥 {report.facility}
                        </h2>


                        <p>
                            Worker:
                            <b> {report.worker}</b>
                        </p>


                        <p>
                            Patients Today:
                            <b> {report.patientsToday}</b>
                        </p>


                        <p>
                            Available Beds:
                            <b> {report.availableBeds}</b>
                        </p>


                        <hr />


                        <h3>
                            🤖 AI Analysis
                        </h3>


                        <p>
                            Risk:
                            <b>
                                {" "}
                                {report.aiRisk || "Processing..."}
                            </b>
                        </p>


                        <p>
                            Confidence:
                            <b>
                                {" "}
                                {report.confidence || 0}%
                            </b>
                        </p>


                        <p>
                            Summary:
                            <br />
                            {report.aiSummary || "Waiting for AI"}
                        </p>


                        <p>
                            Recommendation:
                            <br />
                            {report.aiRecommendation || "Waiting for AI"}
                        </p>


                    </div>

                ))
            }


        </div>

    );
}



function Card({ title, value }) {

    return (

        <div
            style={{
                flex: 1,
                padding: "20px",
                borderRadius: "10px",
                background: "#f3f4f6",
                textAlign: "center"
            }}
        >

            <h3>
                {title}
            </h3>

            <h1>
                {value}
            </h1>

        </div>

    );

}


export default DistrictAdmin;