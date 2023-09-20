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
import Blogue from "./pages/Blogue";
import PostFullScreen from "./pages/PostFullScreen";

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

                    <Route path="/" element={<Landing />} />
                    <Route path="/accueilConnecte" element={<AccueilConnecte />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/blogue" element={<Blogue />} />
                    <Route path="/projets" element={<Projets />} />
                    <Route path="/u/:username" element={<Profil />} />
                    <Route path="/p/:postId" element={<PostFullScreen />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default Layout;