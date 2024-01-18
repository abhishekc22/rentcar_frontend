import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Adminchart = ({ monthlySalesData }) => {
  // Check if monthlySalesData is not null
  if (!monthlySalesData) {
    // You can return a loading indicator or handle the null case accordingly
    return <div>Loading...</div>;
  }

  const monthNames = ['December', 'January', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const data = monthlySalesData.map((monthData, index) => ({
    name: monthNames[index], 
    pv: monthData.total_sales,
  }));
  const CustomizedDot = (props) => {
    
  };

  return (
    <div>
      <h2 className='mt-9 font-bold'>Monthly Sales Report</h2>
      <br></br>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" dot={<CustomizedDot />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Adminchart;
