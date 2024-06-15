import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Gallery from "./pages/Gallery/Gallery";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import LoginForm from "./components/Login/LoginForm";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import ManagePosts from "./pages/AdminPanel/Post/ManagePosts.tsx";
import ManageMember from "./pages/AdminPanel/Member/ManageMember.tsx";
import ManageAccount from "./pages/AdminPanel/Account/ManageAccount.tsx";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./hoc/ProtectedRoute";
import ToastNotification from "./components/Toast/ToastNotification.tsx";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/admin"
            element={<ProtectedRoute element={<AdminPanel />} />}
          />
          <Route
            path="/admin/manage-posts"
            element={<ProtectedRoute element={<ManagePosts />} />}
          />
          <Route
            path="/admin/manage-member"
            element={<ProtectedRoute element={<ManageMember />} />}
          />
          <Route
            path="/admin/manage-account"
            element={<ProtectedRoute element={<ManageAccount />} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ToastNotification />
      </div>
    </AuthProvider>
  );
};

export default App;
