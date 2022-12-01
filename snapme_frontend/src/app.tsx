import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./container/home";
import Login from "./components/login";
import { ENV } from "./utils/Env";

function App() {
  return (
    <GoogleOAuthProvider clientId={`${ENV.GOOGLE_API_TOKEN}`}>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
