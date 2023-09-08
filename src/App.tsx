import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fetchCruises } from '@/api';
import { store } from '@/store';
import '@/tokens.css';
import CruiseTable from '@/CruiseTable/CruiseTable';
import { setCruises, setTotalArea, MainSliceState } from './MainSlice';
import '@/App.css';

const App: React.FC = () => {
  const [state, setState] = useState({
    darkMode: true,
    isLoading: true,
    selectedShip: null as string | null,
    selectedYear: null as string | null,
    filteredCruises: [] as any[]
  });

  const dispatch = useDispatch();
  const { cruises, totalArea } = useSelector((state: { main: MainSliceState }) => state.main);

  useEffect(() => {
    const fetchData = async () => {
      setState(prev => ({ ...prev, isLoading: true }));
      const data = await fetchCruises();
      dispatch(setCruises(data));
      const total = data.reduce((acc, cruise) => {
        const area = Number(cruise.total_area);
        return isNaN(area) ? acc : acc + area;
      }, 0);
      dispatch(setTotalArea(total));
      setState(prev => ({ ...prev, isLoading: false }));
    };
    fetchData();
  }, [dispatch]);
  
  useEffect(() => {
    document.body.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  }, [state.darkMode]);

  useEffect(() => {
    const filtered = cruises.filter(cruise =>
      (!state.selectedShip || cruise.platform_id === state.selectedShip) &&
      (!state.selectedYear || cruise.year === state.selectedYear)
    );
    setState(prev => ({ ...prev, filteredCruises: filtered }));
  }, [cruises, state.selectedShip, state.selectedYear]);

  return (
    <div className="container mx-auto p-4">
      {state.isLoading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <select className="border p-2 filter-dropdown" onChange={(e) => setState(prev => ({ ...prev, selectedShip: e.target.value }))}>
              <option value="">Filter by Ship</option>
              {Array.from(new Set(cruises.map(cruise => cruise.platform_id))).map(ship => (
                <option key={ship} value={ship}>{ship}</option>
              ))}
            </select>
            <select className="border p-2 filter-dropdown" onChange={(e) => setState(prev => ({ ...prev, selectedYear: e.target.value }))}>
              <option value="">Filter by Year</option>
              {Array.from(new Set(cruises.map(cruise => cruise.year))).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="bg-blue-200 p-4 mb-4">
            <h1>Total Area: {totalArea}</h1>
            <div style={{ display: 'grid', justifyItems: 'center', gap: '40px' }}>
              <img src="https://images.squarespace-cdn.com/content/v1/5f83594a0507f9511d470c33/1602445805416-QJDMTHKU64SPQ8ONZ3JE/Bedrock_Logo.png?format=1500w" alt="Company Logo" style={{ width: '20%' }} />
              <button className="button" onClick={() => setState(prev => ({ ...prev, darkMode: !prev.darkMode }))}>
                Toggle Theme
              </button>
            </div>
          </div>
          <CruiseTable selectedShip={state.selectedShip} selectedYear={state.selectedYear} />
        </>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
