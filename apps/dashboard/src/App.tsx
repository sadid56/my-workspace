import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHome from "@/pages/DashboardHome";
import BlogsPage from "@/pages/BlogsPage";
import CreateBlogPage from "@/pages/CreateBlogPage";
import EditBlogPage from "@/pages/EditBlogPage";
import CategoriesPage from "@/pages/CategoriesPage";
import FeedbackPage from "@/pages/FeedbackPage";
import KeywordsPage from "@/pages/KeywordsPage";
import SettingsPage from "@/pages/SettingsPage";
import UsersPage from "@/pages/UsersPage";
import SignInPage from "@/pages/SignInPage";
import useCurrentUser from "./hooks/useCurrentUser";

function ProtectedRoute() {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center text-lg font-medium">Loading session...</div>;
  }

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth/sign-in" element={<SignInPage />} />

        {/* Protected Dashboard routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/create" element={<CreateBlogPage />} />
            <Route path="blogs/edit/:id" element={<EditBlogPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="keywords" element={<KeywordsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        </Route>

        {/* Fallbacks */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
