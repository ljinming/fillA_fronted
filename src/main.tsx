/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/pages";
import "./index.scss";
import * as buffer from "buffer";
import store from "@/server/modules";
import { Provider } from "react-redux";

if (typeof (window as any).global === "undefined") {
  (window as any).global = window;
}
if (typeof (window as any).Buffer === "undefined") {
  (window as any).Buffer = buffer.Buffer;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
