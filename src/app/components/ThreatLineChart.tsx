import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

interface ThreatLineChartProps {
  data: number[];
  anomalies: boolean[];
}

export default function ThreatLineChart({ data, anomalies }: ThreatLineChartProps) {
  const xAxisData = Array.from({ length: data.length }, (_, i) => i + 1); // Generate x-axis (time) points
  const anomalyData = data.map((value, index) => (anomalies[index] ? value : null)); // Highlight anomalies

  return (
    <div className="threatDetection">
      <h2>Real-Time Threat Detection</h2>
      <LineChart
        xAxis={[
          {
            data: xAxisData,
            label: "Time",
            stroke: "black",
          },
        ]}
        series={[
          {
            data: data,
            label: "Predictions",
            color: "blue",
          },
          {
            data: anomalyData,
            label: "Anomalies",
            color: "red",
          },
        ]}
        height={350}
        width={600}
        sx={{ backgroundColor: "#fff", fontSize: "16px", marginTop: "3%" }}
      />
    </div>
  );
}
