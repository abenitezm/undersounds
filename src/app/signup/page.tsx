'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../colors';
import PrimaryButton from '../components/PrimaryButton';
import FancyButton from '../components/FancyButton';
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
import { useAuth } from "../components/AuthContext";

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
    gap: 20px;
    background-color: ${colors.background};
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    padding: 7px;
    border: 1px solid ${colors.primary};
    border-radius: 5px;
    font-size: 16px;
`;

const Logo = styled.img`
    height: 80px;
    width: auto;
    margin-bottom: 15px;
`;

const Botoneselección = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px; // Añadimos un espacio entre los botones
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const { setUserRole } = useAuth();
    const [errorInputs, setErrorInputs] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes manejar el registro
        console.log('Correo:', email);
        console.log('Contraseña:', password);
        console.log('Rol:', role);
    };

    const manejadorInputs = async () => {
        if (!email || !password || !confirmPassword || !role) {
            toast.error("Tienes que introducir valores en todos los campos y seleccionar un rol");
            setErrorInputs(true);
        } else if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            setErrorInputs(true);
        } else {
            toast.success("Te has registrado correctamente");
            setUserRole(role);
        }
    };

    return (
        <Container>
            <Logo src="/logo.svg" alt="Logo" />
            <Form onSubmit={handleSubmit}>
                <Botoneselección>
                    <FancyButton
                        title="Fan"
                        imageSrc="prettyButtons/artista.png"
                        bgColor={role === 'fan' ? "#D3D3D3" : "#A8DADC"}
                        onClick={() => setRole('fan')}
                    />
                    <FancyButton
                        title="Artista"
                        imageSrc="prettyButtons/artista.png"
                        bgColor={role === 'artista' ? "#D3D3D3" : "#F4A261"}
                        onClick={() => setRole('artista')}
                    />
                </Botoneselección>
                <Input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
               {/* Añadimos un checkbox para aceptar los términos y condiciones */}
                <CheckboxContainer>
                    <Checkbox
                        type="checkbox"
                    />
                    <span>He leído y acepto los términos y condiciones</span>
                </CheckboxContainer>
                <ButtonContainer>
                    {/* Si hay error, no se puede hacer el enlace */}
                    {errorInputs ? (
                        <PrimaryButton text={"Registrarse"} onClick={manejadorInputs} />
                    ) : (
                        <Link href="/" passHref>
                            <PrimaryButton text={"Registarse"} onClick={manejadorInputs}/>
                        </Link>
                    )}
                </ButtonContainer>
            </Form>
            <ToastContainer position="bottom-center" autoClose={3000} />
        </Container>
    );
}