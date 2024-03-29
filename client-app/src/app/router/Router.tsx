import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/forms/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import App from "../layout/App";
import ProfilePage from "../../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import RegisterSuccess from "../../features/activities/users/RegisterSuccess";
import ConfirmEmail from "../../features/activities/users/ConfirmEmail";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'activities', element: <ActivityDashboard /> },
                    { path: 'activity/:id', element: <ActivityDetails /> },
                    { path: 'createActivity', element: <ActivityForm key='create' /> },
                    { path: 'manage/:id', element: <ActivityForm key='manage' /> },
                    { path: 'profiles/:username', element: <ProfilePage /> },
                    { path: 'errors', element: <TestErrors /> }
                ]
            },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'account/registerSuccess', element: <RegisterSuccess /> },
            { path: 'account/verifyEmail', element: <ConfirmEmail /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
]

export const router = createBrowserRouter(routes);