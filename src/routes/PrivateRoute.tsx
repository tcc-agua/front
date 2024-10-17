import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUtilsStore from "../store/utils";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const { isTokenExpired } = useUtilsStore();

    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            if (isTokenExpired()) {
                console.log("TOKEN EXPIRADO! Redirecionando para o login.");
                navigate("/login", { replace: true });
            }
        };

        // Verificar a cada 5 segundos
        const interval = setInterval(checkToken, 5000);

        // Limpar intervalo quando o componente for desmontado
        return () => clearInterval(interval);
    }, [isTokenExpired, navigate]);

    return <>{children}</> // Renderizando as rotas protegidas
};

export default PrivateRoute;