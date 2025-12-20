from fastapi import FastAPI
from app.services.data_loader import load_sp500_data
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional



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
def index_history(start: Optional[str] = None, end: Optional[str] = None):
    df = load_sp500_data()

    if start:
        df = df[df["Date"] >= start]
    if end:
        df = df[df["Date"] <= end]

    records = df.to_dict(orient="records")
    return {"symbol": "^GSPC", "points": records}
