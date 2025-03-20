'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../colors';
import PrimaryButton from '../components/PrimaryButton';
import {toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
import { useAuth } from "../components/AuthContext";
import { em } from 'framer-motion/client';

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
    background-color: ${colors.background};
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
    height: 80px;
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
            //window.location.href = "/Perfil"; // Redirigimos a la página principal
        }
    }

    return (
        <Container>
            <Logo src="logo.svg" alt="Logo" />
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
                    <p>Si no tienes cuenta, <Link href="/signup">regístrate</Link></p>
                </TextContainer>
            </Form>
            <ToastContainer position="bottom-center" autoClose={3000}/>
        </Container>
    );
}