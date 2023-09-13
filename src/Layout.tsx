import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './styles/global.css'
import AccueilConnecte from "./pages/AccueilConnecte";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Forum from "./pages/Forum"
import Projets from "./pages/Projets";
import Landing from "./pages/Landing";
import Profil from "./pages/Profil";

function Layout() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Toaster />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/accueilConnecte" element={<AccueilConnecte />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/projets" element={<Projets />} />
                    <Route path="/profil/:username" element={<Profil />} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default Layout;