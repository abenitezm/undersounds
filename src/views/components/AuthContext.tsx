"use client";

import { createContext, useContext, useState, ReactNode } from "react";

//Definición de tipo de usuario
type UserRoles = "registrado" | "invitado";

interface AuthContextType {
    userRole : UserRoles;
    setUserRole : (role : UserRoles) => void; 
}

//Creación del contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Proveedor del contexto
export const AuthProvider = ({ children }: {children : ReactNode}) => {
    const [userRole, setUserRole] = useState<UserRoles>("registrado");

    return (
        <AuthContext.Provider value={{ userRole, setUserRole}}>
            {children}
        </AuthContext.Provider>
    );
};

//Hook para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
}