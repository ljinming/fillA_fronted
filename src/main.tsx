/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/pages";
import "./index.scss";
import { Buffer } from "buffer";

window.Buffer = window.Buffer || Buffer;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
