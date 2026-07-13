import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";

import { AppWrapper } from "./components/common/pagemeta/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import ToastProvider from "./components/common/toast/ToastProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>

        <ToastProvider>
          <AppWrapper>
            <RouterProvider router={router} />
          </AppWrapper>
        </ToastProvider>
    
    </ThemeProvider>
  </StrictMode>,
);
