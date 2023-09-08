import React from 'react';
import { useSelector } from 'react-redux';
import { MainSliceState } from './MainSlice';

const CruiseTable: React.FC = () => {
  const cruises = useSelector((state: { main: MainSliceState }) => state.main.cruises);
  const totalArea = useSelector((state: { main: MainSliceState }) => state.main.totalArea);

  return (
    <div>
      <h1>Total Area: {totalArea}</h1>
      <table>
        <thead>
          <tr>
            <th>Entry ID</th>
            <th>Ship Name</th>
            <th>Total Area</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {cruises.map((cruise, index) => (
            <tr key={`${cruise.entry_id}-${index}`}>
                <td>{cruise.entry_id}</td>
                <td>{cruise.platform_id}</td>
                <td>{cruise.total_area}</td>
                <td>{cruise.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CruiseTable;
