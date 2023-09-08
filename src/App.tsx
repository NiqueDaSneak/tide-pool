import React, { useEffect, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/store';
import '@/index.css';
import { fetchCruises } from './api';
import CruiseTable from './CruiseTable';
import { setCruises, setTotalArea } from './MainSlice';
import './App.css';
const MainContext = createContext({});

const App: React.FC = () => {
  const dispatch = useDispatch();

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
    <MainContext.Provider value={{}}>
      <h1>GMRT Cruises</h1>
      <CruiseTable />
    </MainContext.Provider>
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
