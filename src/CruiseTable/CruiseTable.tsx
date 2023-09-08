import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MainSliceState, setSortOrder, setItemsPerPage, setCurrentPage } from '../MainSlice'; 
import './CruiseTable.css';

interface CruiseTableProps {
  selectedShip: string | null;
  selectedYear: string | null;
}


const CruiseTable: React.FC<CruiseTableProps> = ({ selectedShip, selectedYear }) => {
  const dispatch = useDispatch();
  const { cruises, sortOrder, itemsPerPage, currentPage } = useSelector((state: { main: MainSliceState }) => state.main);

  // Check if cruises is iterable
  if (!Array.isArray(cruises)) {
    return <div>Loading...</div>;
  }

  // Sort cruises by date
  const sortedCruises = [...cruises].sort((a, b) => {
    const dateA = new Date(a.year);
    const dateB = new Date(b.year);
    return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  

  // Filter cruises by selected ship and year
  const filteredCruises = sortedCruises.filter(cruise => {
    return (selectedShip ? cruise.platform_id === selectedShip : true) &&
           (selectedYear ? cruise.year === selectedYear : true);
  });

  // Update pagination logic to use filteredCruises
  const totalPages = Math.ceil(filteredCruises.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCruises = filteredCruises.slice(startIndex, endIndex);
  
  return (
    <div className="table-container">
      <div style={{ 
        marginBottom: '40px', 
        display: 'grid',
        gap: '10px',
        justifyItems: 'start'
      }} 
      className="flex justify-between mb-4">
        <button className="sort-button button" onClick={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}>
          Sort by Date ({sortOrder})
        </button>
        <select style={{color: 'black'}} className="items-per-page-select" onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}>
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
          <option value="30">Show 30</option>
        </select>
      </div>
      <table className="cruise-table">
        <thead>
          <tr>
            <th>Entry ID</th>
            <th>Ship Name</th>
            <th>Date</th>
            <th>Total Area</th>
            <th>Track Length</th>
            <th>File Count</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCruises.map((cruise, index) => (
            <tr key={cruise.entry_id + index}>
              <td>{cruise.entry_id}</td>
              <td>{cruise.platform_id}</td>
              <td>{cruise.year}</td>
              <td>{cruise.total_area}</td>
              <td>{cruise.track_length}</td>
              <td>{cruise.file_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{
        marginTop: '40px',
        display: 'grid',
        justifyContent: 'start',
        gridTemplateColumns: 'auto auto auto',
        justifyItems: 'center',
        alignItems: 'center',
        gap: '20px'
      }} className="pagination">
        <button className="button" onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button className="button" onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CruiseTable;
