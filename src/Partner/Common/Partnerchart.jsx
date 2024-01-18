import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Partnerchart extends PureComponent {
  render() {
    const data = [
    { name: 'januvary', uv: 4000 },
    { name: 'februvary', uv: 3000 },
    { name: 'march', uv: 2000 },
    { name: 'april' },
    { name: 'may', uv: 1890 },
    { name: 'june', uv: 2390 },
    { name: 'july', uv: 3490 },
  ];

  return (
    <div style={{ width: '100%' }}>
    
      <ResponsiveContainer width="120%" height={300}>
        <LineChart
          width={500}
          height={200}
          data={data}
          margin={{
            top:0,
            right: 10,
            left: 0,
            bottom: 0,
            
          }}
         
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  }
}
