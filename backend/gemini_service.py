import os
import json
import time
from pathlib import Path

from groq import Groq
from dotenv import dotenv_values

config = dotenv_values(".env")

API_KEY = config.get("GROQ_API_KEY")

if not API_KEY:
    raise Exception("GROQ_API_KEY not found")

client = Groq(api_key=API_KEY)

# Recommended model
MODEL_NAME = "openai/gpt-oss-20b"


def analyze_report(report):

    prompt = f"""
You are an AI Healthcare Monitoring Assistant for:

Government of NCT of Delhi
Department of Health & Family Welfare

Your task is to analyze real-time reports submitted from:

- Government Hospitals
- Community Health Centres (CHCs)
- Primary Health Centres (PHCs)

across Delhi's administrative districts.

Analyze the following healthcare facility report:

{json.dumps(report, indent=2, default=str)}

Evaluate:

1. Healthcare risk level
2. Current operational situation
3. Medicine availability problems
4. Patient load pressure
5. Bed availability
6. Emergency response requirements
7. Recommended government action

Risk classification:

Stable:
Facility operations are normal.

Attention:
Facility needs monitoring or support.

Critical:
Immediate government intervention required.

Return ONLY valid JSON.

{{
    "risk": "",
    "summary": "",
    "recommendation": "",
    "confidence": 0
}}

Rules:
- risk must be only Stable, Attention, or Critical.
- confidence must be a number between 0 and 100.
- summary should explain the situation clearly.
- recommendation should contain practical healthcare actions.
"""

    retries = 3

    for attempt in range(retries):

        try:

            response = client.chat.completions.create(
                model=MODEL_NAME,
                temperature=0.2,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"}
            )

            text = response.choices[0].message.content.strip()

            result = json.loads(text)

            return result

        except Exception as e:

            print(f"Groq attempt {attempt + 1} failed:", e)

            if attempt < retries - 1:

                wait_time = (attempt + 1) * 3

                print(f"Retrying after {wait_time} seconds...")

                time.sleep(wait_time)

            else:

                raise e