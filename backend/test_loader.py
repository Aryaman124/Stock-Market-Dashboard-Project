from app.services.data_loader import load_sp500_data

df = load_sp500_data()
print(df.head())
print(df.columns)