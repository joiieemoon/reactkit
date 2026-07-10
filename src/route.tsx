import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

// Layouts
const AppLayout = lazy(() => import("./components/layout/AppLayout"));

//auth
const AuthLayout = lazy(() => import("./features/auth/layout"));
// Dashboard
const Home = lazy(() => import("./features/Dashboard/Home"));

// Auth Pages
const SignIn = lazy(() => import("./features/auth/components/signin-form"));

const SignUp = lazy(() => import("./features/auth/components/signup-form"));

// Other Pages
const NotFound = lazy(() => import("./features/OtherPage"));
const UserProfiles = lazy(() => import("./features/UserProfile/layout"));

// Forms
const FormElements = lazy(() => import("./features/Forms/FormElements"));

// Tables
const BasicTables = lazy(() => import("./features/auth/Tables/BasicTables"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <SignIn /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "dashboard", element: <Home /> },

      // Profile
      { path: "profile", element: <UserProfiles /> },

      // Forms
      { path: "form-elements", element: <FormElements /> },

      // Tables
      { path: "basic-tables", element: <BasicTables /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
