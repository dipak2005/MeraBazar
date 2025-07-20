import {BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from './App.jsx'
import Footer from "./common/Footer.jsx";

createRoot(document.getElementById('root')).render(
   
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
    {/* <Footer/> */}
  </BrowserRouter>
)
