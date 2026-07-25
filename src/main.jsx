import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";


const root = createRoot(document.getElementById("root"));
root.render(
    <App />
);