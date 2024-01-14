import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';

const root = ReactDOM.createRoot(document.body);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
