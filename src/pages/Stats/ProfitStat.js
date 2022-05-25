import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Spin } from "antd";
import stats from "../../api/stats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfitStat = () => {
  const profitOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Прибуток",
      },
    },
  };

  const [profit, setProfit] = useState(null);

  useEffect(() => {
    stats.getProfit().then((data) => {
      setProfit(data.data);
    });
  }, []);

  const labels = ["Прибуток", "Втрачено"];

  const data = {
    labels,
    datasets: [
      {
        label: "Гривень",
        data: [profit?.profit, profit?.lost],
        backgroundColor: "#856084",
      },
    ],
  };
  return <>{profit ? <Bar options={profitOptions} data={data} /> : <Spin />}</>;
};

export default ProfitStat;
