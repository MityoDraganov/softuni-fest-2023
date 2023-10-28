import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { errorNotification } from "./notificationHandler";

const PrivateRoute = ({ path, component: Component, ...props }) => {
    const { accessData } = useContext(AuthContext);
    if (!accessData.email) {
        return <Component />;
    }
    errorNotification("Can't access this page if you are already logged in!")
    console.log('here');
    return <Navigate to={`/`} />;
};

export default PrivateRoute;