import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { errorNotification } from "./notificationHandler";

const PrivateRoute = ({ path, component: Component, ...props }) => {
    const { accessData } = useContext(AuthContext);

    if (!accessData.email) {
        return <Component />;
    }
    errorNotification("Can't access register/login page if registered")
    return <Navigate to={`/`} />;
};

export default PrivateRoute;