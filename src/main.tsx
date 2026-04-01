import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AchievementProvider } from "@/context/AchievementContext";

createRoot(document.getElementById("root")!).render(
	<AchievementProvider>
		<App />
	</AchievementProvider>,
);
