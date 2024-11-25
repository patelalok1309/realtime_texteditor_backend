import { createBrowserRouter } from "react-router-dom";
import TextEditor from "../screens/TextEditor";

import App from "../App.js";
import AuthForm from "../screens/Auth";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute component={App} />,
    },
    {
        path: "/login",
        element: <AuthForm />,
    },
    {
        path: "/document/:id",
        element: <ProtectedRoute component={TextEditor} />,
    },
], {
    future: {
        v7_startTransition : true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
});

export default router;
