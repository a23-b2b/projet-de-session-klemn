import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import AccueilConnecte from "./pages/AccueilConnecte";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Forum from "./pages/Forum"
import Projets from "./pages/Projets";
import Landing from "./pages/Landing";
import Blogue from "./pages/Blogue";

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
                    <Route path="/blogue" element={<Blogue/>} />
                    <Route path="/projets" element={<Projets />} />
                    {/* 
                    <Route path="/p/:id" element={composant post utilisateur zoomé + commentaires} /> 
                    <Route path="/u/:id" element={composant page profil public} /> 
                    */}
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    );
}

export default Layout;