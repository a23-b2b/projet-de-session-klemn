import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Forum from "./pages/Forum";
import Blogue from "./pages/Blogue";
import Projets from "./pages/Projets";
import AccueilConnecte from "./pages/AccueilConnecte";

function Layout() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/accueilConnecte" element={<AccueilConnecte />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/blogue" element={<Blogue />} />
                    <Route path="/projets" element={<Projets />} />
                    
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default Layout;