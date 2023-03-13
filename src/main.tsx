/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/pages";
import "./index.scss";
import * as buffer from "buffer";

if (typeof (window as any).global === "undefined") {
  (window as any).global = window;
}
if (typeof (window as any).Buffer === "undefined") {
  (window as any).Buffer = buffer.Buffer;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
