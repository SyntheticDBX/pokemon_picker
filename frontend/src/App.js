import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateTeam from "./components/CreateTeam";
import RandomTeam from './components/RandomTeam';
import ViewTeam from './components/ViewTeam';
import Admin from "./components/Admin";
import PageNotFound from "./components/PageNotFound";
import Unauthorised from "./components/Unauthorised";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("/getUsername")
      .then((res) => res.json())
      .then((userObj) => setUser(userObj.username));
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/create-team" element={<CreateTeam user={user} />} />
        <Route path="/random-team" element={<RandomTeam user={user} />} />
        <Route path="/view-team" element={<ViewTeam user={user} />} />
        <Route path="/admin" element={<Admin user={user} />} />
        <Route path="/unauthorised" element={<Unauthorised user={user} />} />
        <Route path="*" element={<PageNotFound user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
