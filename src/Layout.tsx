import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Forum from "./pages/Forum"
import Projets from "./pages/Projets";
import Landing from "./pages/Landing";

function Layout() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Toaster />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/accueil" element={<Accueil />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/projets" element={<Projets />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Layout;