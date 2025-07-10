import { BrowserRouter } from "react-router";
import { AppRoutes } from "./global/router/router";
// import { AuthProvider } from "./context/AuthContext";
import { store } from "./global/store/index";
import { Provider } from "react-redux";

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}
