import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./authprovider/AuthProvider.jsx";
import "react-multi-carousel/lib/styles.css";
import "antd/dist/reset.css";
import socket from "./socket.js";
// import "antd/dist/antd.css";

const queryClient = new QueryClient();

socket.connect();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
