import { BrowserRouter } from "react-router";
import { AppRoutes } from "./global/router/index";
// import { AuthProvider } from "./context/AuthContext";
import { store } from "./global/store/index";
import { Provider } from "react-redux";
import './style.css'; 

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}