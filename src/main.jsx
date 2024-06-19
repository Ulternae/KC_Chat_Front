import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import "./i18n.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getSettings } from "./utils/getSettings.jsx";

const settings = getSettings()

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App settings={settings}/>
  </GoogleOAuthProvider>
);
