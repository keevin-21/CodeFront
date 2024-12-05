// App.jsx
// ROUTES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./routes/Root";
import ProtectedRoute from "./routes/ProtectedRoute";
import { SessionProvider } from "./contexts/SessionContext";
// PAGES
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import News from "./pages/news";
import Favorites from "./pages/favorites";
import Profile from "./pages/profile";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Root />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="news" element={<News />} />
                    {/* Elimina el ProtectedRoute temporalmente */}
                    <Route path="profile" element={<Profile />} />
                    <Route path="favorites" element={<Favorites />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;

/* YA QUE SE MANEJEN LAS SESIONES
return (
        <SessionProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Root />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route
                            path="profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="favorites"
                            element={
                                <ProtectedRoute>
                                    <Favorites />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </SessionProvider>
    );
*/