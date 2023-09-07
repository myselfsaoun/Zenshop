import {
  createBrowserRouter, RouterProvider,
  Outlet, Navigate
} from "react-router-dom";
import Footer from "../common/footer/Footer";
import Navbar from "../common/navbar/Navbar";
import Profile from "../pages/profile/Profile";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Home from "../pages/home/Home";
import Product from "../pages/product/Product";
import Products from "../pages/products/Products";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ForgotPassword from '../pages/ password/forgotPassword/ForgotPassword';
import ResetPassword from '../pages/ password/resetPassword/ResetPassword';
import Error from "../pages/error/Error";
import Success from "../pages/success/Success";
import Cancel from "../pages/cancel/Cancel";
import { useSelector } from "react-redux";
import Protected from '../routes/Protected';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Index = () => {
  const user = useSelector(state => state.user?.currentUser?.user);
  
  const Layout = () => {

    return (
      <div className="layout">
        <Navbar user={user} />
        <Outlet />
        <Footer />
        <ToastContainer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: (
            user ? <Profile /> : <Navigate to="/" />
          ),
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/products/:category",
          element: <Products />,
        },
        {
          path: "/product/:id",
          element: <Product user={user} />,
        },
        {
          path: "/register",
          element: (
            !user ? <Register /> : <Navigate to="/" />
          ),
        },
        {
          path: "/login",
          element: (
            !user ? <Login /> : <Navigate to="/" />
          ),
        },
        {
          path: "/forgotpassword/:id/:token",
          element: (
            !user && <ForgotPassword />
          ),
        },
        {
          path: "/password-reset",
          element: (
            !user && <ResetPassword />
          ),
        },
        {
          path: "/success",
          element: (
            <Protected user={user}>
              <Success />
            </Protected>
          ),
        },
        {
          path: "/cancel",
          element: (
            <Protected user={user}>
              <Cancel />
            </Protected>
          ),
        },
        {
          path: "/*",
          element: <Error />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Index;