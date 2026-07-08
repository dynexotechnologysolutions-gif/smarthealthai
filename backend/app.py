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

    reports = (
        db.collection("facilityReports")
        .where("status", "==", "pending_ai")
        .stream()
    )

    processed = 0

    for doc in reports:

        report = doc.to_dict()

        print("Analyzing:", doc.id)

        analysis = analyze_report(report)

        db.collection("facilityReports").document(doc.id).update({

            "aiRisk": analysis["risk"],
            "aiSummary": analysis["summary"],
            "aiRecommendation": analysis["recommendation"],
            "confidence": analysis["confidence"],

            "status": "completed"
        })

        processed += 1


    return jsonify({
        "processed": processed
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)