import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import PageNotFound from "./pages/PageNotFound";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Tickets from "./pages/Tickets";
import AboutUs from "./pages/AboutUs";
import Booking from "./pages/Booking";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./styles/index.scss";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },
  {
    path: "/tickets",
    element: <Tickets />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
