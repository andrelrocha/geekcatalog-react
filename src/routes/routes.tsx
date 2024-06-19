import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../screens/NotAuth/Home"
import Login from "../screens/NotAuth/User/Login"
import About from "../screens/NotAuth/About"
import { useAuth } from "../context/hooks";
import { useEffect } from "react";

import HomeAuth from "../screens/Auth/Home";

export default function AppRouter() {
    const { authState } = useAuth();
    const { authenticated } = authState;

    useEffect(() => {
        console.log("Authenticated:", authenticated);
        console.log("AuthState:", authState);
    }, [authenticated]);    

    return (
        <Router>
            <Routes>
                {["/", "/home"].map((path, index) => 
                    <Route path={path} element={<Home/>} key={index} />
                )}
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                {authenticated ? (
                    <Route path="/homeauth" element={<HomeAuth />} />
                ) : null}
            </Routes>
        </Router>
    )
}