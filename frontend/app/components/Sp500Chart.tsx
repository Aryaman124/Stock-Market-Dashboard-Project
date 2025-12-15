"use client";

import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

type Point = {
  Date: string;
  Close: number;
};

export default function Sp500Chart() {
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://127.0.0.1:8000/api/index/history");
      const json = await res.json();
      setPoints(json.points);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading S&P 500 data...</div>;

  const x = points.map((p) => p.Date);
  const y = points.map((p) => p.Close);

  return (
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
  );
}
