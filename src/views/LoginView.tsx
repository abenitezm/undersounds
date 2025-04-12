"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../app/colors";
import PrimaryButton from "../views/components/PrimaryButton";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { useAuth } from "../views/components/AuthContext";
import { useRegister } from "../views/components/RegisterContext";
import { useRouter } from "next/navigation";
import { register } from "module";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../app/firebaseConfig";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInputs, setErrorInputs] = useState(false);
  const [validToken, setValidToken] = useState("");
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
    console.log("Correo:", email);
    console.log("Contraseña:", password);
  };

  const manejadorInputs = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reinicia los errores
    setEmailError(false);
    setPasswordError(false);

    if (!email && !password) {
      toast.error("Tienes que introducir valores en los dos campos");
      setEmailError(true);
      setPasswordError(true);
      return;
    }
  
    if (!email || !password) {
      toast.error("Tienes que introducir un valor en el campo que falta");
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }
  
    if (!emailRegex.test(email)) {
      toast.error("El correo electrónico no es válido");
      setEmailError(true);
      return;
    }


    // Login de tokens

    try {
      const response = await fetch("http://127.0.0.1:8000/usersRegistrados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json();
      if (data.error === "Usuario no registrado en Firestore") {
        console.log("entro");
        toast.error("No tienes una cuenta registrada. Por favor, regístrate.");
        return;
      } 

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
      console.log("Cargo");
      const { token, role, username, uid, pass, registerRole } = data;

      setValidToken(token);


      // Guardamos el token localmente si quieres usarlo en peticiones futuras
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("username", username);
      localStorage.setItem("uid", uid);
      localStorage.setItem("password", pass); // Password registrada en el user.
      localStorage.setItem("registerRole", registerRole);

      toast.success(`Bienvenido de nuevo ${role}`);
      if ( uid !== undefined ){
        router.push("/Perfil");
      }
    } catch (error) {
      console.error("Error en autenticación:", error);
      toast.error("Error al iniciar sesión. Revisa tus credenciales.");
    }
  }

  useEffect(() => {
    if ( localStorage.getItem("authToken") !== null ){ // Si el token ya está almacenado en cache no hay que iniciar sesión
      setUserRole("registrado");
      console.log(localStorage.getItem("authToken"));
      router.push("/Perfil");
    }
    if (registerRole === "artista") {
      router.push("/Perfil");
    }
    if (registerRole === "fan") {
      router.push("/Perfil");
    }
  }, []);

  return (
    <Container>
      <Logo src="longLogo.svg" alt="Logo" />
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          $errorInputs={emailError}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          $errorInputs={passwordError}
        />
        <ButtonContainer>
          <PrimaryButton
            type="submit"
            text={"Iniciar sesión"}
            onClick={manejadorInputs}
          />
        </ButtonContainer>
        <TextContainer>
          <br />
          <p>
            Si no tienes cuenta,{" "}
            <Link href="/signup">
              <u>regístrate</u>
            </Link>
          </p>
        </TextContainer>
      </Form>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </Container>
  );
};

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

const Input = styled.input<{ $errorInputs: boolean }>`
  padding: 15px;
  border: 2px solid
    ${({ $errorInputs }) => ($errorInputs ? "red" : "${colors.primary}")};
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

export default LoginView;