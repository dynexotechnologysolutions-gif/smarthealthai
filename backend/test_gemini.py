import json

from gemini_service import analyze_report


test_report = {

    "facility": "Burari PHC",

    "district": "Central Delhi",

    "patientsToday": 100,

    "availableBeds": 80,

    "doctorPresent": True,

    "medicine": {
        "name": "Aspirin",
        "currentStock": 50,
        "minimumStock": 500
    },

    "testAvailability": {
        "name": "CBC",
        "status": "Available"
    }

}


# Test Tamil output

result = analyze_report(
    test_report,
    "Tamil"
)


print(
    json.dumps(
        result,
        indent=4,
        ensure_ascii=False
    )
)