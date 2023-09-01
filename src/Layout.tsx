import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Forum from "./pages/Forum"
import Projets from "./pages/Projets";

function Layout() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/projets" element={<Projets />} />


                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default Layout;