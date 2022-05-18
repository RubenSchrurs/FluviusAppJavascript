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
import { useEffect, React } from "react";
import { useDatasources } from "../../contexts/DatasourcesProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart",
    // },
  },
};

export default function BarChartDoelstellingen({ file, eenheid }) {
  const { data: filedata, getFileByName } = useDatasources();

  //y-waareden grafiek
  let labels = [];

  //x-waarden grafiek
  let data = [];

  useEffect(() => {
    getFileByName(file);
    labels = [];
    data = [];
  }, [file, getFileByName]);

  filedata.slice(1).map((entry) => {
    let delen = entry[0].split(";");
    labels.push(delen[0]);
    data.push(delen[1]);
    console.log(entry);
    console.log(data);
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: file.substring(0, file.length - 4) + ` (${eenheid})`,
        data: data,
        backgroundColor: "rgba(0, 0, 255, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
