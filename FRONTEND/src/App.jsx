import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Singup from "./Pages/Singup/Singup";
import Login from "./Pages/Login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Context/AuthProvider";
import ProjectedRoute from "./components/ProjectedRoutes/ProjectedRoute";
import EditorPage from "../src/Pages/Editor/EditorPage";
import HomePage from "./Pages/Home/HomePage";
import TrendingPage from "./Pages/Home/TrendingPage";
import SearchQurry from "./Pages/Search/SearchQurry";
import NotFound from "./Pages/NotFound/NotFound";
import ProfilePage from "./Pages/Profile/ProfilePage";
import BlogDeatilsPage from "./Pages/BlogDeatilsPage/BlogDeatilsPage";
import PostEditorPage from "./Pages/Editor/PostEditorPage";
import LikeProvider from "./Context/LikeProvider";
import Settings from "./Pages/Settings/Settings";
import EditProfile from "./Pages/Settings/EditProfile/EditProfile";
import ChangePassword from "./Pages/Settings/ChangePassword/ChangePassword";
import Notifaction from "./Pages/Dashboard/Notifaction/Notifaction";
import BlogManagement from "./Pages/Dashboard/Blog/BlogManagement";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/trending", element: <TrendingPage /> },
      { path: "/search/:id", element: <SearchQurry /> },
      { path: "/user/:id", element: <ProfilePage /> },
      { path: "/blog/:id", element: <BlogDeatilsPage /> },
      {
        path: "/",
        element: <Settings />,
        children: [
          { path: "/settings/edit-profile", element: <EditProfile /> },
          { path: "/settings/change-password", element: <ChangePassword /> },
          { path: "/dashboard/notifaction", element: <Notifaction /> },
          { path: "/dashboard/blog", element: <BlogManagement /> },
        ],
      },
      {
        path: "/singup",
        element: (
          <ProjectedRoute>
            <Singup />
          </ProjectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProjectedRoute>
            <Login />
          </ProjectedRoute>
        ),
      },
      {
        path: "/editor",
        element: <EditorPage />,
      },
      {
        path: "/editor/:id",
        element: <PostEditorPage />,
      },
    ],
  },
  // {
  //   path: "/settings",
  //   element: <Settings />,
  //   children: [{ path: "edit-profile", element: <EditProfile /> }],
  // },
  { path: "*", element: <NotFound /> },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LikeProvider>
          <RouterProvider router={router}></RouterProvider>
        </LikeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
