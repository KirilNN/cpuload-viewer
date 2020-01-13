import React from "react";
import DashboardComponent from "./components/DashboardComponent";
import { Provider } from "react-redux";
import { configureStore } from "./store";

function App() {
  return (
    <Provider store={configureStore()}>
      <DashboardComponent />
    </Provider>
  );
}
export default App;
