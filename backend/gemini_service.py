import os
import json
import time

from dotenv import load_dotenv
from groq import Groq


load_dotenv()


API_KEY = os.getenv("GROQ_API_KEY")


if not API_KEY:
    raise Exception(
        "GROQ_API_KEY not found. Check your backend/.env file."
    )


client = Groq(api_key=API_KEY)


MODEL_NAME = "llama-3.3-70b-versatile"



def analyze_report(report, language="English"):


    report_json = json.dumps(
        report,
        indent=2,
        ensure_ascii=False,
        default=str
    )


    prompt = f"""

You are an AI Healthcare Monitoring Assistant for the Government of NCT of Delhi.

You monitor:

- Government Hospitals
- Community Health Centres (CHCs)
- Primary Health Centres (PHCs)


Selected Output Language:

{language}



==============================
STRICT LANGUAGE GENERATION RULES
==============================


1. Generate ALL AI-generated text fields strictly in:

{language}


2. Language quality is extremely important.

You MUST:

- Generate natural human language.
- Generate meaningful sentences only.
- Never create fake words.
- Never generate random characters.
- Never use meaningless translations.
- Never translate word-by-word from English.
- Understand the meaning first, then write naturally.


3. Tamil language rules:

If the selected language is Tamil:


- Use simple modern Tamil.
- Use Tamil suitable for government healthcare communication.
- Use language understandable by doctors, nurses, and health workers.
- Maintain correct Tamil grammar.
- Avoid literary/classical Tamil.
- Avoid machine-translated Tamil.
- Avoid uncommon words.


Incorrect example:

"பிழி நவலு கழிதி புத்"


Correct example:

"மருந்து இருப்பு குறைவாக உள்ளது. உடனடி மருத்துவ உதவி தேவை."



4. Telugu language rules:

If Telugu is selected:

- Use natural Telugu.
- Use healthcare communication style.
- Avoid direct machine translation.



5. Kannada language rules:

If Kannada is selected:

- Use simple professional Kannada.
- Use correct grammar.
- Avoid artificial words.



6. Malayalam language rules:

If Malayalam is selected:

- Use natural Malayalam.
- Avoid literal translation.
- Use understandable healthcare terms.



7. Never translate these:


Keep unchanged:

- Medicine names
  Example:
  Aspirin
  Metronidazole
  CBC


- Hospital names

- Facility names

- District names

- Numbers

- Percentages



8. Translate ONLY these fields:

- summary
- recommendation
- earlyWarnings
- demandForecast.medicineDemand
- demandForecast.bedDemand
- resourceRedistribution.action
- districtPriority
- medicine notes



9. Before returning JSON verify:


✓ Correct requested language

✓ Meaningful sentences

✓ Healthcare meaning preserved

✓ No fake words

✓ No mixed languages

✓ Valid JSON format



==============================
HEALTHCARE REPORT
==============================


{report_json}



==============================
TASKS
==============================


Analyze:


1. Determine healthcare risk.

2. Summarize operational situation.

3. Recommend actions.

4. Predict medicine shortages.

5. Forecast patient demand.

6. Forecast medicine demand.

7. Forecast bed demand.

8. Recommend redistribution of medicines, beds, or staff.

9. Assign government intervention priority.



Risk values:

ONLY:

Stable

Attention

Critical



Return ONLY valid JSON.

No markdown.

No explanation.



Required JSON format:



{{
    "risk": "",

    "summary": "",

    "recommendation": "",

    "confidence": 0,


    "earlyWarnings": [
        "",
        ""
    ],


    "demandForecast": {{

        "expectedPatientIncrease": "",

        "medicineDemand": "",

        "bedDemand": ""

    }},



    "resourceRedistribution": {{

        "priority": "",

        "action": ""

    }},


    "districtPriority": ""

}}



Rules:


confidence:

Number between 0 and 100.



earlyWarnings:

Return 2 to 4 warnings.



Example:

- Medicine stock is critically low.
- Patient admission may increase tomorrow.
- Additional beds are required.
- Medical staff deployment recommended.



demandForecast example:


expectedPatientIncrease:

"15%"


medicineDemand:

"Increase medicine supply by 20%"


bedDemand:

"Need 5 additional beds"



resourceRedistribution:


priority:

High

Medium

Low


action:

Give a practical healthcare action.



districtPriority:

Only:

High

Medium

Low



Return JSON only.

"""



    retries = 3


    for attempt in range(retries):

        try:


            response = client.chat.completions.create(

                model=MODEL_NAME,


                temperature=0.2,


                top_p=0.7,


                response_format={
                    "type": "json_object"
                },


                messages=[

                    {
                        "role": "system",
                        "content":
                        """
You are an expert multilingual healthcare AI assistant.

Your priorities:

1. Produce accurate healthcare analysis.
2. Follow requested language exactly.
3. Generate natural human language.
4. Never generate meaningless words.
5. Always return valid JSON only.
"""
                    },


                    {
                        "role": "user",
                        "content": prompt
                    }

                ]

            )



            text = (
                response
                .choices[0]
                .message
                .content
                .strip()
            )



            result = json.loads(text)



            required_fields = [

                "risk",
                "summary",
                "recommendation",
                "confidence",
                "earlyWarnings",
                "demandForecast",
                "resourceRedistribution",
                "districtPriority"

            ]



            for field in required_fields:

                if field not in result:

                    raise Exception(
                        f"Missing JSON field: {field}"
                    )



            return result



        except Exception as error:


            print(
                f"Groq attempt {attempt + 1} failed:",
                error
            )


            if attempt < retries - 1:


                wait = (attempt + 1) * 3


                print(
                    f"Retrying after {wait} seconds..."
                )


                time.sleep(wait)


            else:

                raise