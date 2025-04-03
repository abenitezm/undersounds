'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../colors';
import PrimaryButton from '../components/PrimaryButton';
import {toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
import { useAuth } from "../components/AuthContext";
import { useRegister } from '../components/RegisterContext';
import { em } from 'framer-motion/client';
import {useRouter} from 'next/navigation';
import { register } from 'module';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background: url("/graffiti.svg") no-repeat center center;
    background-size: cover;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 40px;
    background-color: ${colors.tertiary};
    padding: 70px;
    border-radius: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input<{$errorInputs : boolean}>`
    padding: 15px;
    border: 2px solid ${({$errorInputs}) => ($errorInputs ? "red" : "${colors.primary}")};
    border-radius: 5px;
    font-size: 16px;
`;

const Logo = styled.img`
    height: 50px;
    width: auto;
    margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const TextContainer = styled.div`
    margin-top: -30px;
    margin-bottom: -30px;
    text-align: center;
    color: ${colors.secondary};
`;

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorInputs, setErrorInputs] = useState(false);
    const { setUserRole } = useAuth();
    const { userRole } = useAuth();
    const { registerRole } = useRegister();
    const router = useRouter();

    // Estados para errores específicos
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes manejar el inicio de sesión
        console.log('Correo:', email);
        console.log('Contraseña:', password);
    };

    const manejadorInputs = async() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Reinicia los errores
        setEmailError(false);
        setPasswordError(false);

        if (!email && !password){
            toast.error("Tienes que introducir valores en los dos campos");
            setEmailError(!errorInputs);
            setPasswordError(!errorInputs);
        } else if(!email || !password){
            toast.error("Tienes que introducir un valor en el campo que falta");
            setEmailError(!errorInputs);
            setPasswordError(!errorInputs);

        }
        else if(!emailRegex.test(email)){
            toast.error("El correo electrónico no es válido");
            setEmailError(!errorInputs);

        }
        else {
            toast.success("Has iniciado sesión correctamente");
            setUserRole("registrado");
            //router.push('/Perfil'); 
        }

        
        //OAuth
        try {
            // Comprobación de si firebase está inicializado correctamente
            console.log("Firebase Auth instance:", auth);
            let token_aux = null;

            try {
                // Intentar iniciar sesión
                const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                console.log("Inicio de sesión exitoso:", userCredentials.user);

                // Tenemos que coger el token del usuario que ya está registrado también
                const token = await userCredentials.user.getIdToken();
                token_aux = token;
                console.log("Token:", token);

            } catch (error) {
                if ((error as any).code === "auth/invalid-credential") {

                    // Si el usuario no existe, lo creamos
                    console.log("Usuario no encontrado, registrando...");
                    
                    try {
                        // Creamos el nuevo usuario
                        const nuevoUsuario = await createUserWithEmailAndPassword(auth, email, password);
                        // Le asignamos el token al usuario nuevo
                        const token = await nuevoUsuario.user.getIdToken();
                        // Sirve para el código del data que está más abajo
                        token_aux = token;
                        console.log("Usuario registrado:", nuevoUsuario.user);
                        console.log("Token:", token);
                    } catch (errorRegistro) {
                        console.error("Error al registrar usuario:", (errorRegistro as any).message);
                    }
                } else {
                    console.error("Error en login:", (error as any).message);
                }
            }
            
            // Enviamos una petición al server del backend
            const response = await fetch("http://127.0.0.1:8000/user", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token_aux}`,
                    "Context-Type": "application/json", // No es obligatorio, pero es recomendable
                },
            });
            
            // Si me funciona el fetch, conseguiré la respuesta y se podrá entrar en el perfil
            if (!response.ok) {
                toast.error(`Error ${response.status}: "Algo salió mal"`);
            } else {
                const data = await response.json();
                console.log("Respuesta del servidor:", data);
                toast.success("Has iniciado sesión correctamente");
                setUserRole("registrado");
                router.push('/Perfil');
            }
        } catch (error) {
            toast.error("Error al iniciar sesión. Revisa tu correo y contraseña.");
            console.error("Error en login:", error);
        }
        
    }

    useEffect(() => {
        if(registerRole === "artista"){
            router.push('/Perfil');
        }
        if( registerRole === "fan"){
            router.push('/Perfil');
        }
    }, [registerRole])

    return (
        <Container>
            <Logo src="longLogo.svg" alt="Logo" />
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    $errorInputs  = {emailError}
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    $errorInputs  = {passwordError}
                />
                <ButtonContainer>
                    <PrimaryButton type="submit" text={"Iniciar sesión"} onClick={manejadorInputs}/>
                </ButtonContainer>
                <TextContainer>
                    <br />
                    <p>Si no tienes cuenta, <Link href="/signup"><u>regístrate</u></Link></p>
                </TextContainer>
            </Form>
            <ToastContainer position="bottom-center" autoClose={3000}/>
        </Container>
    );
}