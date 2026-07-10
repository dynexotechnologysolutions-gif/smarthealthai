# SmartHealthAI 🏥🤖

## AI-Powered Healthcare Monitoring and Resource Intelligence Platform

SmartHealthAI is an AI-driven healthcare monitoring platform designed to help government healthcare systems analyze hospital operations, detect risks, forecast resource requirements, and provide actionable recommendations.

The platform combines Artificial Intelligence, multilingual support, real-time healthcare data monitoring, and dashboard visualization to improve healthcare decision-making.

---

# 🚀 Key Features

## 🤖 AI Healthcare Intelligence

SmartHealthAI uses AI to analyze healthcare facility data and generate:

- Healthcare risk assessment
- Operational summaries
- Early warning alerts
- Medicine shortage prediction
- Patient demand forecasting
- Bed requirement forecasting
- Resource redistribution recommendations
- District-level healthcare priorities


## 🌐 Multilingual Healthcare Support

The platform supports multiple Indian languages:

- English
- Tamil
- Hindi
- Telugu
- Kannada
- Malayalam


The multilingual system improves accessibility for healthcare workers by providing localized healthcare insights.


## 🏥 Healthcare Facility Monitoring

The system monitors:

- Government Hospitals
- Community Health Centres (CHCs)
- Primary Health Centres (PHCs)


Tracked information:

- Patient count
- Available beds
- Medicine inventory
- Emergency level
- Doctor availability
- Medical test availability


---

# 🧠 AI Analysis Workflow


```
Healthcare Facility Data

          |

          v

AI Healthcare Analysis Engine

          |

          v

Risk Detection

          |

          v

Demand Forecasting

          |

          v

Resource Recommendation

          |

          v

Healthcare Dashboard
```


---

# ✨ AI Generated Insights

The AI system provides:


### Risk Classification

Possible risk levels:

- Stable
- Attention
- Critical


### Demand Forecast

Predicts:

- Expected patient increase
- Medicine requirements
- Additional bed requirements


### Resource Redistribution

Provides recommendations for:

- Medicine transfer
- Bed allocation
- Staff deployment


---

# 🛠 Technology Stack


## Frontend

- React.js
- Vite
- Tailwind CSS
- JavaScript
- i18next Internationalization


## Backend

- Python
- FastAPI
- REST APIs


## Artificial Intelligence

- Groq AI API
- Llama 3.3 70B Model
- AI Prompt Engineering
- Structured JSON AI Responses


## Database

- Firebase Firestore


## Deployment

Frontend:

- Vercel


Backend:

- Render


---

# 📂 Project Structure


```
SmartHealthAI/

│
├── backend/
│   │
│   ├── app.py
│   ├── gemini_service.py
│   ├── requirements.txt
│
│
├── src/
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── HealthWorker.jsx
│   │
│   ├── i18n/
│   │   ├── en.json
│   │   ├── ta.json
│   │   ├── hi.json
│   │   ├── te.json
│   │   ├── kn.json
│   │   ├── ml.json
│   │   └── i18n.js
│
│
├── package.json
├── README.md
```

---

# 📊 Example AI Response


```json
{
  "risk": "Critical",
  "summary": "மருந்து இருப்பு குறைவாக உள்ளது. உடனடி நடவடிக்கை தேவை.",
  "confidence": 85,
  "districtPriority": "High"
}
```


---

# 🔐 Environment Configuration


Backend requires:


```
GROQ_API_KEY=your_api_key_here
```


Never expose API keys publicly.


---

# ▶️ Running Locally


## Frontend


Install dependencies:

```bash
npm install
```


Start application:

```bash
npm run dev
```



## Backend


Navigate:

```bash
cd backend
```


Install requirements:

```bash
pip install -r requirements.txt
```


Run server:

```bash
python app.py
```


---

# 📱 Application Modules


## Admin Dashboard

Provides:

- Hospital overview
- AI risk analysis
- Resource monitoring
- Healthcare insights


## Health Worker Portal

Provides:

- Facility information
- Patient monitoring
- Medical resource updates
- Local language support


## Authentication

Includes:

- User login
- Role-based access
- Healthcare worker access


---

# 🌱 Future Enhancements


Future improvements:

- Real-time government healthcare API integration
- Advanced ML forecasting models
- Mobile healthcare worker application
- More regional language support
- IoT-based hospital monitoring


---

# 👨‍💻 Development Team

Developed as an AI-powered healthcare innovation project.

---

# 📄 License

This project is developed for healthcare technology research and innovation purposes.