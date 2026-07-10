from flask import Flask, jsonify
from flask_cors import CORS

from firebase_service import db
from gemini_service import analyze_report

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Smart Health AI Backend Running"


@app.route("/analyze-pending")
def analyze_pending():

    reports = db.collection("facilityReports").stream()

    processed = 0

    language_map = {
        "en": "English",
        "hi": "Hindi",
        "ta": "Tamil",
        "te": "Telugu",
        "ml": "Malayalam",
        "kn": "Kannada"
    }

    for doc in reports:

        report = doc.to_dict()

        print("--------------------------------")
        print("Document:", doc.id)
        print("Status:", report.get("status"))

        if report.get("status") != "pending_ai":
            continue

        selected_language = language_map.get(
            report.get("language", "en"),
            "English"
        )

        print("Analyzing report:", doc.id)
        print("Selected Language:", selected_language)

        analysis = analyze_report(
            report,
            selected_language
        )

        db.collection("facilityReports").document(doc.id).update({

            # AI Result
            "aiRisk": analysis.get("risk"),
            "aiSummary": analysis.get("summary"),
            "aiRecommendation": analysis.get("recommendation"),
            "confidence": analysis.get("confidence"),

            # Early Warnings
            "aiEarlyWarnings": analysis.get(
                "earlyWarnings",
                []
            ),

            # Demand Forecast
            "aiDemandForecast": analysis.get(
                "demandForecast",
                {
                    "expectedPatientIncrease": "",
                    "medicineDemand": "",
                    "bedDemand": ""
                }
            ),

            # Resource Redistribution
            "aiResourceRedistribution": analysis.get(
                "resourceRedistribution",
                {
                    "priority": "",
                    "action": ""
                }
            ),

            # District Priority
            "aiDistrictPriority": analysis.get(
                "districtPriority",
                ""
            ),

            # Mark Complete
            "status": "completed"
        })

        processed += 1

    return jsonify({
        "success": True,
        "processed": processed
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )