import React from 'react'
import {
    createBrowserRouter, RouterProvider,
    Outlet, Navigate
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages
import Home from '../pages/home/Home'
import List from '../pages/list/List'
import User from '../pages/user/User'
import Product from '../pages/product/Product'
import NewUser from '../pages/newUser/NewUser'
import NewProduct from '../pages/newProduct/NewProduct'
import Order from '../pages/order/Order';
import Category from '../pages/category/Category';
import NewCategory from '../pages/newCategory/NewCategory';
import SubCategory from '../pages/subCategory/SubCategory';
import NewSubCategory from '../pages/newSubCategory/NewSubCategory';
import Navbar from '../common/navbar/Navbar';
import Sidebar from '../common/sidebar/Sidebar'
import Login from '../pages/login/Login'
import Error from "../pages/error/Error"

import { useSelector } from 'react-redux';
import {
    userColumns, productColumns, orderColumns,
    categoryColumns, subCategoryColumns
} from '../data/TableSource';


const Index = () => {
    const isAdmin = useSelector(state => state.admin?.currentUser?.user?.isAdmin);
    
    const Layout = () => {
        return (
            <div className="layout">
                <Navbar />
                <div className="container">
                    <div className="sidebar">
                        <Sidebar />
                    </div>
                    <div className="mainContent">
                        <Outlet />
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }

    const ProtectedRoute = ({ children }) => {
        if (!isAdmin) {
            return <Navigate to='/login' />
        }

        return children;
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/users",
                    element: <List columns={userColumns} />,
                },
                {
                    path: "/users/:userId",
                    element: <User />,
                },
                {
                    path: "/users/new",
                    element: <NewUser />,
                },
                {
                    path: "/products",
                    element: <List columns={productColumns} />,
                },
                {
                    path: "/products/:productId",
                    element: <Product />,
                },
                {
                    path: "/products/new",
                    element: <NewProduct />,
                },
                {
                    path: "/orders",
                    element: <List columns={orderColumns} />,
                },
                {
                    path: "/orders/:orderId",
                    element: <Order />,
                },
                {
                    path: "/categories",
                    element: <List columns={categoryColumns} />,
                },
                {
                    path: "/categories/:categoryId",
                    element: <Category />,
                },
                {
                    path: "/categories/new",
                    element: <NewCategory />,
                },
                {
                    path: "/subcategories",
                    element: <List columns={subCategoryColumns} />,
                },
                {
                    path: "/subcategories/:subCategoryId",
                    element: <SubCategory />,
                },
                {
                    path: "/subcategories/new",
                    element: <NewSubCategory />,
                },
                {
                    path: "*",
                    element: <Error />,
                },
            ],
        },
        {
            path: "/login",
            element: (
                isAdmin === undefined
                    ? <Login />
                    : <Navigate to='/' replace/>
            )
        }
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );

}

export default Index;