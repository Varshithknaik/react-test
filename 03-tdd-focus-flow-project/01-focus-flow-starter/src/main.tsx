import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppWithContext from "./AppWithContext.tsx";
import { FlowProvider } from "./FlowContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <FlowProvider>
      <AppWithContext />
    </FlowProvider>
  </StrictMode>
);
