import { createRoot } from "react-dom/client";

import "./index.scss";
import App from "./components/App/index.tsx";

const dom_index = document.getElementById("index");

if (dom_index) {
    createRoot(dom_index).render(<App />);
} else {
    console.error(`DOM Element with id="index" not found`);
}
