import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../screens/NotAuth/Home"
import Login from "../screens/NotAuth/User/Login"
import About from "../screens/NotAuth/About"

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {["/", "/home"].map((path, index) => 
                    <Route path={path} element={<Home/>} key={index} />
                )}
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    )
}