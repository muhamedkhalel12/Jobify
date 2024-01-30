import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    AllJobs,
    Profile,
    Stats,
    AddJob,
    Admin,
    EditJob

} from './pages'
import {action as registerAction} from './pages/Register.jsx'
import {action as loginAction} from './pages/Login.jsx'
import {loader as dashboardLoader} from './pages/DashboardLayout.jsx'
import {action as addJobAction} from './pages/AddJob.jsx'
import {loader as allJobsLoader} from './pages/AllJobs.jsx'
import {loader as editJobLoader} from './pages/EditJob.jsx'
import {action as editJobAction} from './pages/EditJob.jsx'
import {action as allJobsDeleteAction} from './pages/AllJobs.jsx'
import {loader as adminLoader} from './pages/Admin.jsx'
import {action as profileAction} from './pages/Profile.jsx'
import {loader as statsLoader} from './pages/Stats.jsx'
// import {SearchContainer} from "./components/index.js";
// import {action as searchAction} from './components/SearchContainer.jsx'

const router = createBrowserRouter([
    {
    path: '/',
    element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />
            }

            ,{
        path: 'register' , // here we don't need to use / because all of them are relative to parent path
        element: <Register />,
                action: registerAction
    },
    {
        path: 'login',
        element: <Login />,
        action: loginAction
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
            {
                index: true,
                element: <AddJob />,
                action: addJobAction,
            },
            // {
            //     element: <SearchContainer />,
            //     action: searchAction
            // },
            {
                path: 'all-jobs',
                element: <AllJobs />,
                loader: allJobsLoader,
                action: allJobsDeleteAction
            },
            {
                path: 'stats',
                element: <Stats/>,
                loader: statsLoader
            },
             {
                path: 'profile',
                element: <Profile />,
                 action: profileAction
            },
            {
                path: 'admin',
                element: <Admin />,
                loader: adminLoader
            },
            {
                path: 'edit-job/:id',
                element: <EditJob />,
                loader: editJobLoader,
                action: editJobAction
            }
        ]
    }
        ]
},


    ]
)
const App = () => {
    return(
        <RouterProvider router={router}/>
    )
}

export default App