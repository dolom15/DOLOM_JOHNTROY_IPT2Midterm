import { Routes, Route } from 'react-router-dom';

import ClubNavbar from './components/ClubNavbar';
import Home from './pages/Home';
import Members from './pages/Members';
import About from './pages/About';

export default function App() {
  return (
    <>
      <ClubNavbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}