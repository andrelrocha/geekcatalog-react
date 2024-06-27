import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Footer, Header } from "../components"
import Home from "../screens/NotAuth/Home"
import Login from "../screens/NotAuth/User/Login"
import About from "../screens/NotAuth/About"
import { useAuth } from "../context/hooks";
import { useEffect } from "react";
import Create from "../screens/NotAuth/User/Create"
import HomeAuth from "../screens/Auth/Home";
import NotFoundPage from "../screens/NotFound"
import ForgotPassword from "../screens/NotAuth/User/ForgotPassword"
import ResetPassword from "../screens/NotAuth/User/ResetPassword"

export default function AppRouter() {
    const { authState } = useAuth();
    const { authenticated } = authState;

    useEffect(() => {
    }, [authenticated]);    

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Create />} />
                <Route path="/about" element={<About />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                
                {authenticated ? (
                    <Route path="/home" element={<HomeAuth />} />
                ) : null}

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </Router>
    )
}