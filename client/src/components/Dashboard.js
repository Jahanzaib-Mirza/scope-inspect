// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { Line } from 'react-chartjs-2';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [data, setData] = useState([]);
  const [intervalTime, setIntervalTime] = useState(60000); // default 10 seconds

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/data');
      setData((prevData) => [...prevData, response.data.temperature]);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // useEffect with proper dependencies and cleanup
  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, intervalTime);

    return () => clearInterval(intervalId); // Cleanup on unmount or intervalTime change
  }, [intervalTime]); // Dependency array

  const chartData = {
    labels: data.map((_, index) => `Point ${index + 1}`),
    datasets: [
      {
        label: 'Temperature',
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className="App">
      <h1>Real-Time Weather Dashboard</h1>
      <div>
        <label>Refresh Interval:</label>
        <select onChange={(e) => setIntervalTime(Number(e.target.value))} value={intervalTime}>
          <option value={10000}>10 seconds</option>
          <option value={30000}>30 seconds</option>
          <option value={60000}>1 minute</option>
        </select>
      </div>
      <Line data={chartData} />
    </div>
  );
}

export default App;
