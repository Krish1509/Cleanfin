import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  ScriptableContext
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FIIDIIData } from './FIIDIITrades';
import moment from 'moment';
import { TradeTime } from './contsant';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getRoundedCorners = (ctx: ScriptableContext<'bar'>) => {
  const value = ctx.raw as number;
  return {
    topLeft: value > 0 ? 8 : 0,
    topRight: value > 0 ? 8 : 0,
    bottomLeft: value < 0 ? 8 : 0,
    bottomRight: value < 0 ? 8 : 0,
  };
};

const BarChart: React.FC<{ data: FIIDIIData, tradesTimes: TradeTime }> = ({ data, tradesTimes }) => {
  let labels = Object.keys(data);
  const DII_Net = labels.map(date => data[date].DII.totalNet);
  const FII_Net = labels.map(date => data[date].FII.totalNet);
  labels = labels.map(date => {
    if (tradesTimes === TradeTime.Year) {
      return moment(date).format("YYYY")
    } else if (tradesTimes === TradeTime.Month) {
      return moment(date).format("MMM YYYY")
    } else {
      return moment(date).format("DD MMM YYYY")
    }
  });

  const allNetValues = [...FII_Net, ...DII_Net];
  const maxAbsValue = Math.ceil(Math.max(...allNetValues.map(Math.abs)) / 1000) * 1000; // rounded to nearest 1000

  const chartData: ChartData<'bar', number[], string> = {
    labels,
    datasets: [
      {
        label: 'FII Net Value',
        data: FII_Net,
        backgroundColor: '#edb168',
        borderRadius: getRoundedCorners,
      },
      {
        label: 'DII Net Value',
        data: DII_Net,
        backgroundColor: '#6cb6f3',
        borderRadius: getRoundedCorners,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'FII/DII Data',
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded', // RoundedSquare - rectRounded & Circle - roundRect
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        min: -maxAbsValue,
        max: maxAbsValue,
        ticks: {
          callback: value => `${value}`
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;