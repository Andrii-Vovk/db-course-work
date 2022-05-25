import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from "react-chartjs-2";
import { Spin } from "antd";
import stats from "../../api/stats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PolicyCount = () => {
  const profitOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Кількість полісів",
      },
    },
  };

  const [policies, setPolicies] = useState(null);

  const getMonthNames = (monthsIdArray) => {
    const months = [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ];
    return monthsIdArray?.map((monthId) => months[monthId - 1]);
  };

  useEffect(() => {
    stats.getThisYearPolicies().then((data) => {
      setPolicies(data.data);
    });
  }, []);

  const labels = getMonthNames(policies?.map((policy) => policy.month));

  const data = {
    labels,
    datasets: [
      {
        label: "Кількість",
        data: policies?.map((policy) => policy.count),
        backgroundColor: "#856084",
      },
    ],
  };
  return (
    <>{policies ? <Line options={profitOptions} data={data} /> : <Spin />}</>
  );
};

export default PolicyCount;
