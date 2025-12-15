import pandas as pd
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[2] / "data" / "sp500.csv"

def load_sp500_data():
    # Skip the extra Yahoo header rows
    df = pd.read_csv(DATA_PATH, skiprows=[1, 2])

    # Rename 'Price' column to 'Date'
    if "Price" in df.columns:
        df = df.rename(columns={"Price": "Date"})

    # Parse dates and sort
    df["Date"] = pd.to_datetime(df["Date"])
    df = df.sort_values("Date").reset_index(drop=True)

    return df
