import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "./app/dashboard/layout";
import DashboardHome from "./app/dashboard/page";
import BlogsPage from "./app/dashboard/blogs/page";
import CreateBlogPage from "./app/dashboard/blogs/create/page";
import EditBlogPage from "./app/dashboard/blogs/edit/[id]/page";
import CategoriesPage from "./app/dashboard/categories/page";
import FeedbackPage from "./app/dashboard/feedback/page";
import KeywordsPage from "./app/dashboard/keywords/page";
import SettingsPage from "./app/dashboard/settings/page";
import UsersPage from "./app/dashboard/users/page";
import SignInPage from "./app/auth/sign-in/page";
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
