import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import SomethingList from "./pages/SomethingList";
import SomethingDetails from "./pages/SomethingDetails";
import LocationsList from "./pages/LocationsList";
import LocationDetails from "./pages/LocationDetails";
import EpisodesList from "./pages/EpisodesList";
import EpisodeDetails from "./pages/EpisodeDetails";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="items" element={<SomethingList />} />
          <Route path="items/:id" element={<SomethingDetails />} />
          <Route path="locations" element={<LocationsList />} />
          <Route path="locations/:id" element={<LocationDetails />} />
          <Route path="episodes" element={<EpisodesList />} />
          <Route path="episodes/:id" element={<EpisodeDetails />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}
