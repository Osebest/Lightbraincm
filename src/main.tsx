import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <IconContext.Provider value={{ className: "" }}>
        <ToastContainer position="top-right" />
        <App />
      </IconContext.Provider>
    </ChakraProvider>
  </StrictMode>
);
