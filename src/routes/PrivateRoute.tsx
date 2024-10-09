import React from "react";
import { Navigate } from "react-router-dom";
import useUtilsStore from "../store/utils";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const { isTokenExpired } = useUtilsStore();

    if(isTokenExpired()){
        return <Navigate to="/login" replace />;
    }

    return <>{children}</> // Renderizando as rotas protegidas
};

export default PrivateRoute;