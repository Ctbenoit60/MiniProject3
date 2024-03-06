import { Route, Routes } from "react-router-dom";
import "./App.css";
// import IndexPage from "./pages/IndexPage";
// SUDO: The index page will eventually be a promo page. 
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import SignUp from "./pages/SignUpPage";
import axios from "axios";
import CalendarPage from "./pages/CalendarPage";
import EventsPage from "./pages/EventsPage";
// SUDO: Removing backend page for now. Plan on adding it back in when Image APi is implemented

axios.defaults.baseURL = 'http://127.0.0.1:4000';

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
