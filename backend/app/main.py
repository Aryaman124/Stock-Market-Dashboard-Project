from fastapi import FastAPI
from app.services.data_loader import load_sp500_data
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="Stock Market Dashboard API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/index/history")
def index_history():
    df = load_sp500_data()

    # Convert to JSON-friendly format
    records = df.to_dict(orient="records")
    return {"symbol": "^GSPC", "points": records}
