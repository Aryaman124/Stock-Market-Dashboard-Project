
import yfinance as yf

# Download S&P 500 data
sp500 = yf.download(
    "^GSPC",
    start="2015-12-15",
    end="2025-12-15"
)

# Save to CSV
sp500.to_csv("data/sp500.csv")

print("S&P 500 data downloaded and saved to backend/data/sp500.csv")
