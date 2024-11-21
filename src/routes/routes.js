import { createBrowserRouter } from "react-router-dom";
import TextEditor from "../screens/TextEditor/TextEditor.jsx";

import App from "../App.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/document/:id",
        element: <TextEditor />,
    },
]);

// const isAuthenticated = () => {
//     const token = 
// }

export default router;
