import Sp500Chart from "./components/Sp500Chart";

export default function Home() {
  return (
    <main style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 700 }}>
        Stock Market Performance Dashboard
      </h1>
      <p style={{ marginTop: "8px", marginBottom: "20px" }}>
        S&P 500 Explorer
      </p>

      <Sp500Chart />
    </main>
  );
}
