import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PictureProvider } from "./context/PictureContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<PictureProvider>
			<App />
		</PictureProvider>
	</StrictMode>,
);
