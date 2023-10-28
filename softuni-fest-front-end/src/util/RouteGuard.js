import { useContext } from "react";
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext";
import { errorNotification } from "./notificationHandler";



export function RouteGuard({ path, component: Component, ...props }) {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate()
  
          if(isAuthenticated){
              return(
                  <Component />
              )
          } else{
            errorNotification("You must be a logged in user/business to do this!")
            navigate("/")
          }
  }