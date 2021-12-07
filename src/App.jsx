import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import Routes from "./routes/Routes";

export default function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
