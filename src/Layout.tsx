import { BrowserRouter, Navigate, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './styles/global.css'
import AccueilConnecte from "./pages/AccueilConnecte";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Forum from "./pages/Forum"
import Projets from "./pages/Projets";
import Landing from "./pages/Landing";
import Profil from "./pages/Profil";
import Erreur404 from "./pages/404";
import Parametres from "./pages/settings/Parametres";
import ModifierProfil from "./pages/settings/ModifierProfil";
import PostFullScreen from "./pages/PostFullScreen";
import Home from "./pages/Home";

function Layout() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Toaster />
                <Routes>
                    {/* Gestion des erreurs 404 */}
                    <Route path="/404" element={<Erreur404 />} />
                    <Route path="*" element={<Navigate to="/404" />} />

                    <Route path="/" element={<Home />} />
                    <Route path="/authenticate" element={<Landing />} />
                    <Route path="/u/:username" element={<Profil />} />
                    <Route path="/p/:postId" element={<PostFullScreen />} />
                    <Route path="/parametres" element={<Parametres />}>
                        <Route path="profil" element={<ModifierProfil />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default Layout;