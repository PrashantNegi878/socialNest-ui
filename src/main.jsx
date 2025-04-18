import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import './config/firebase';
import { Provider } from 'react-redux';
import store from "./store";

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(

  <StrictMode>
    <Provider store={store}>
        <App />
        </Provider>
  </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
