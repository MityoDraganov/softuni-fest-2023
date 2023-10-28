import { Navigate } from "react-router-dom"
import { errorNotification } from "./notificationHandler";

export function PaymentRoute({ path, component: Component, ...props }) {
    const data = JSON.parse(localStorage.getItem("access_info"))
    try {
        if (data.email) {
            return <Component />
        }
    } catch (e) {
        errorNotification("You must be a logged in user/business to do this!")
        return <Navigate to={`/`} />
    }
}