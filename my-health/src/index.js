import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Signin from './components/Account/Signin';
import CreateAccount from './components/Account/CreateAccount';
import HomePage from './components/HomePage';
import GlobalFooterMenu from './components/GlobalFooterMenu';
import HospitalBookingContainer from './components/HospitalBooking/HospitalBookingContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GlobalFooterMenu />}>
            <Route index element={<HomePage />} /> {/* index is added to make sure home page route is matched along with global footer even after matching '/' to global footer */}
            <Route path="/signin" exact element={<Signin />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route
              path="/hospital-booking"
              element={<HospitalBookingContainer />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
