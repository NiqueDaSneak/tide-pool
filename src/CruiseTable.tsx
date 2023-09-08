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
            <th className="py-2 px-4 border-b">Entry ID</th>
            <th className="py-2 px-4 border-b">Ship Name</th>
            <th className="py-2 px-4 border-b">Total Area</th>
            <th className="py-2 px-4 border-b">Year</th>
          </tr>
                  </thead>
        <tbody>
          {cruises.map((cruise, index) => (
          <tr key={`${cruise.entry_id}-${index}`} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
          <td className="py-2 px-4">{cruise.entry_id}</td>
          <td className="py-2 px-4">{cruise.platform_id}</td>
          <td className="py-2 px-4">{cruise.total_area}</td>
          <td className="py-2 px-4">{cruise.year}</td>
        </tr>
          ))}
        </tbody>
      </table>
        {/* Pagination */}
    </div>
  );
};

export default CruiseTable;
