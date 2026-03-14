# AgriERP - ML-Powered Weather Prediction Integration

This repository now includes a full-stack Machine Learning weather forecasting system. It uses a Python FastAPI backend to serve Scikit-Learn Random Forest pipelines trained on synthetic regional data, integrated directly into a React frontend.

## Setup Instructions

### Backend (Python ML API)
You must generate the data, train the models, and start the API server first.

```bash
cd backend
pip install -r requirements.txt
python model_trainer.py        # generates data + trains + saves 10 models
uvicorn main:app --reload --port 8000
```

### Frontend (React Application)
Once the backend is running on port 8000, start the Vite development server.

```bash
# In the root agrierp directory
npm install
npm run dev
```

### Accessing the Application
- **Frontend Dashboard**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:8000](http://localhost:8000)
- **Interactive API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

## Features Included
1. **Interactive Weather Intelligence Page**: `/weather` route for running complex "what-if" agricultural scenarios.
2. **Dashboard Widgets**: A 7-day forecast ML card with dynamic Risk Badges (Frost/Drought/Flood).
3. **Smart Crop Filtering**: Use the AI Suitability Match toggle on the Explore page to filter crops algorithmically.
4. **Seasonal Outlooks**: Recharts integration showing a 3-month predictive temperature/rainfall trend.
