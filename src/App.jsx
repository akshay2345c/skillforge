import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Navbar from './component/Navbar';
import CreateCourse from './pages/CreateCourse';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const lenis = useRef(null);

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.current.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/create-course" element={<CreateCourse />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
