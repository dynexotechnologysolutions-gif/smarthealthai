# Smart Health AI 🏥🤖

## AI-Powered Public Healthcare Monitoring & Early Warning System

Smart Health AI is an AI-driven healthcare intelligence platform designed to help government healthcare administrators monitor hospitals, Community Health Centres (CHCs), and Primary Health Centres (PHCs).

The platform enables healthcare workers to submit real-time facility reports. These reports are analyzed by an Artificial Intelligence engine to generate:

- Healthcare risk assessment
- Early warning alerts
- Patient demand forecasts
- Medicine demand prediction
- Bed requirement forecasting
- Resource redistribution recommendations

The system helps administrators make faster and data-driven healthcare decisions.

---

# 🚀 Project Overview

Healthcare systems face challenges such as:

- Monitoring multiple healthcare facilities
- Detecting medicine shortages early
- Predicting patient surges
- Managing limited beds and resources
- Identifying critical facilities requiring immediate support

Smart Health AI solves these problems by combining:

- Real-time healthcare reporting
- Cloud-based data storage
- Artificial Intelligence analysis
- Multilingual healthcare insights
- Government monitoring dashboard

---

# 🔄 System Workflow

```
Health Worker

      |

      ↓

Firebase Authentication

      |

      ↓

Healthcare Facility Report Submission

      |

      ↓

Cloud Firestore Database

      |

      ↓

AI Healthcare Analysis Engine

      |

      ↓

Risk Detection + Forecasting

      |

      ↓

AI Insights Stored in Firestore

      |

      ↓

Admin Intelligence Dashboard
```

---

# 🤖 Artificial Intelligence Features

## 1. AI Healthcare Risk Prediction

The AI analyzes facility reports and classifies healthcare risk levels:

🟢 Stable  
🟡 Attention  
🔴 Critical  

Example:

```
Risk:
Critical

Reason:
High patient load with low medicine availability.
```

---

# 2. AI Early Warning System

The system detects possible healthcare issues before they become emergencies.

Examples:

- Medicine shortage prediction
- High patient surge detection
- Low bed availability alerts
- Staff requirement identification
- Emergency resource recommendations


Example AI Output:

```
⚠️ Medicine stock may finish within 24 hours.

⚠️ Additional healthcare resources may be required.
```

---

# 3. AI Demand Forecasting

The AI predicts future healthcare requirements.

Forecast includes:

## Patient Demand

Example:

```
Expected Patient Increase:
20%
```

## Medicine Demand

Example:

```
Medicine Demand:
Increase by 25%
```

## Bed Demand

Example:

```
Bed Demand:
Need additional beds
```

---

# 4. Smart Resource Redistribution

The AI recommends optimized resource allocation between healthcare facilities.

Example:

```
Priority:
High

Action:
Transfer medicine supplies from low-demand facilities
to critical healthcare centres.
```

The system helps administrators decide:

- Where medicines should be transferred
- Which facilities need additional resources
- Which districts require urgent intervention

---

# 5. District-Level Healthcare Intelligence

The dashboard identifies priority districts using AI analysis.

AI Priority Levels:

- High
- Medium
- Low


This enables faster government healthcare response.

---

# 🌐 Multilingual AI Support

Smart Health AI supports multiple Indian languages.

Available languages:

- English
- Tamil
- Hindi
- Telugu
- Kannada
- Malayalam


The AI generates healthcare insights in the selected language while maintaining:

- Medicine names
- Hospital names
- Facility names
- District names
- Numbers and percentages

unchanged.

---

# 🖥 Application Modules

## 👨‍⚕️ Health Worker Portal

Healthcare workers can submit:

- Facility information
- Patient count
- Available beds
- Doctor availability
- Medicine inventory
- Diagnostic test availability
- Emergency status
- Situation reports


---

## 🏛️ Admin Intelligence Dashboard

Administrators can monitor:

- Total facilities
- Critical alerts
- AI-generated insights
- Medicine risks
- Patient demand forecasts
- Bed requirements
- Resource recommendations
- District priorities


---

# ✨ Key Features

✅ Firebase Authentication based login

✅ Multi-user healthcare worker system

✅ Multi-facility monitoring

✅ Real-time Firestore data storage

✅ AI healthcare risk prediction

✅ AI early warning generation

✅ Medicine shortage detection

✅ Patient demand forecasting

✅ Bed requirement prediction

✅ Resource redistribution recommendations

✅ District-level priority analysis

✅ Multilingual healthcare intelligence

✅ Live administrator dashboard


---

# 🛠 Technology Stack


## Frontend

- React.js
- Vite
- JavaScript
- CSS
- Internationalization (i18n)


## Backend

- Python
- Flask
- REST API


## Database

- Firebase Authentication
- Cloud Firestore


## Artificial Intelligence

- Groq API
- Large Language Model based healthcare analysis
- Structured JSON AI responses
- Multilingual prompt engineering


## Deployment

Frontend:

- Vercel


Backend:

- Render


---

# 📂 Project Structure


```
SmartHealthAI

│
├── backend
│   │
│   ├── app.py
│   ├── gemini_service.py
│   ├── firebase_service.py
│   ├── requirements.txt
│   ├── Procfile
│   └── runtime.txt
│
│
├── src
│   │
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── HealthWorker.jsx
│   │   └── AdminDashboard.jsx
│   │
│   ├── i18n
│   │   ├── en.json
│   │   ├── ta.json
│   │   ├── hi.json
│   │   ├── te.json
│   │   ├── kn.json
│   │   ├── ml.json
│   │   └── i18n.js
│   │
│   ├── services
│   │   └── firestore.js
│   │
│   └── firebase.js
│
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Local Setup Instructions


## Frontend Setup

Install dependencies:

```bash
npm install
```


Start frontend:

```bash
npm run dev
```


Frontend runs:

```
http://localhost:5173
```


---

## Backend Setup

Navigate:

```bash
cd backend
```


Install dependencies:

```bash
pip install -r requirements.txt
```


Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```


Start backend:

```bash
python app.py
```


Backend runs:

```
http://127.0.0.1:5000
```

---

# 🔐 Environment Security

Never upload sensitive files:

```
.env
firebase-key.json
node_modules
```

Example:

```
GROQ_API_KEY=your_api_key_here
```

---

# 🗄️ Firestore AI Data Flow


Healthcare reports are stored in:

```
facilityReports
```


AI-generated fields include:

```
aiRisk

aiSummary

aiRecommendation

aiEarlyWarnings

aiDemandForecast

aiResourceRedistribution

aiDistrictPriority
```

---

# 📊 Example AI Analysis Output


```
Facility:
Najafgarh CHC


Risk:
Critical


Summary:
Immediate medicine support required.


Early Warnings:

- Medicine stock shortage detected.
- Patient demand expected to increase.


Demand Forecast:

Expected Patient Increase:
20%


Medicine Demand:
Increase required


Bed Demand:
Additional beds required


District Priority:

High
```

---

# 🎯 Hackathon Demonstration Flow


1. Health worker logs into the platform.

2. Health worker submits healthcare facility information.

3. Data is stored securely in Firebase Firestore.

4. Backend sends healthcare data to AI engine.

5. AI generates risk analysis and recommendations.

6. Results are stored back into Firestore.

7. Administrator views AI-powered healthcare intelligence dashboard.


---

# 🌍 Impact


Smart Health AI helps healthcare administrators:

- Detect healthcare problems earlier
- Reduce medicine shortages
- Improve resource allocation
- Monitor multiple facilities
- Support faster decision-making
- Improve accessibility through multilingual AI


---

# 👨‍💻 Project

**Smart Health AI**

AI-powered healthcare intelligence platform built using:

```
React + Firebase + Flask + Artificial Intelligence
```

```
Developed for AI-powered public healthcare innovation.
```
