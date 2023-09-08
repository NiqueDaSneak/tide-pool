import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/store'; 
import '@/App.css'; 
import { fetchCruises } from '@/api';
import CruiseTable from '@/CruiseTable';
import { setCruises, setTotalArea, MainSliceState } from './MainSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const totalArea = useSelector((state: { main: MainSliceState }) => state.main.totalArea);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCruises();
      dispatch(setCruises(data));
      const totalArea = data.reduce((acc, cruise) => {
        const area = parseInt(cruise.total_area, 10);
        return isNaN(area) ? acc : acc + area;
      }, 0);
      dispatch(setTotalArea(totalArea));
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input className="border p-2" type="text" placeholder="Search" />
        <select className="border p-2">
          <option>Filter by Ship</option>
          {/* Add ship options here */}
        </select>
        <select className="border p-2">
          <option>Filter by Year</option>
          {/* Add year options */}
        </select>
      </div>
      <div className="bg-blue-200 p-4 mb-4">
        <h1>Total Area: {totalArea}</h1>
      </div>
      <CruiseTable />
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
