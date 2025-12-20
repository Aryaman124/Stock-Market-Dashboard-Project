"use client";

import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

type Point = {
  Date: string;
  Close: number;
};

export default function SP500Chart() {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  const [start, setStart] = useState("2015-12-15");
  const [end, setEnd] = useState("2025-12-15");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const url = `http://127.0.0.1:8000/api/index/history?start=${start}&end=${end}`;
      const res = await fetch(url);
      const json = await res.json();

      setPoints(json.points);
      setLoading(false);
    }

    fetchData();
  }, [start, end]);

  if (loading) return <div>Loading S&P 500 data...</div>;

  const x = points.map((p) => p.Date);
  const y = points.map((p) => p.Close);

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <label>
          Start{" "}
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>

        <label>
          End{" "}
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
      </div>

      <Plot
        data={[
          {
            x,
            y,
            type: "scatter",
            mode: "lines",
            name: "S&P 500 Close",
          },
        ]}
        layout={{
          title: "S&P 500 Closing Price",
          autosize: true,
          margin: { l: 50, r: 20, t: 50, b: 50 },
        }}
        style={{ width: "100%", height: "500px" }}
        useResizeHandler
      />
    </div>
  );
}
