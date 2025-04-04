"use client";

import { createContext, useContext, useState, ReactNode } from "react";

//Definición de tipo de usuario
type RegisterRoles = "artista" | "fan" | "";

interface RegisterContextType {
    registerRole : RegisterRoles;
    setRegisterRole : (role : RegisterRoles) => void; 
}

//Creación del contexto
const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

//Proveedor del contexto
export const RegisterProvider = ({ children }: {children : ReactNode}) => {
    const [registerRole, setRegisterRole] = useState<RegisterRoles>("");

    return (
        <RegisterContext.Provider value={{ registerRole, setRegisterRole}}>
            {children}
        </RegisterContext.Provider>
    );
};

//Hook para usar el contexto
export const useRegister = () => {
    const context = useContext(RegisterContext);
    if (!context) {
        throw new Error("useRegister debe usarse dentro de AuthProvider");
    }
    return context;
}