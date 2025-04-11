"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../app/colors";
import PrimaryButton from "../views/components/PrimaryButton";
import ElegirUsu from "../views/components/ElegirUsu";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../views/components/AuthContext";
import { useRegister } from "../views/components/RegisterContext";
import { useRouter } from "next/navigation";


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

const Input = styled.input<{ $errorInputs: boolean }>`
  padding: 7px;
  border: 1px solid
    ${({ $errorInputs }) => ($errorInputs ? "red" : "${colors.primary}")};
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

const SignUpView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { setUserRole } = useAuth();
  const { setRegisterRole, registerRole } = useRegister();
  const router = useRouter();

  // Estados para errores específicos
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el registro
    console.log("Correo:", email);
    console.log("Contraseña:", password);
    console.log("Rol:", role);
  };

  const manejadorInputs = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Reinicia los errores
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setRoleError(false);

    if (!email || !password || !confirmPassword || !role) {
      toast.error(
        "Tienes que introducir valores en todos los campos y seleccionar un rol"
      );
      setEmailError(!emailError);
      setPasswordError(!passwordError);
      setConfirmPasswordError(!confirmPasswordError);
      setRoleError(!roleError);
    } else if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      setPasswordError(!passwordError);
      setConfirmPasswordError(!confirmPasswordError);
    } else if (!emailRegex.test(email)) {
      toast.error("Introduce un correo válido");
      setEmailError(!emailError);
    } else if (!acceptedTerms) {
      toast.error("Tienes que aceptar los términos y condiciones");
    } else {
      toast.success("Te has registrado correctamente");
      setUserRole("registrado");
      if (role === "fan") {
        router.push("/Perfil");
      } else if (role === "artista") {
        router.push("/Perfil");
      }
    }

    if( email && password ){
      console.log("Entro en la autentificacion");
      localStorage.setItem("registerRole", registerRole);
      try {
        const response = await fetch("http://127.0.0.1:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          // Enviamos el email y la password para que el backend se encargue de la lógica del OAuth
          body: JSON.stringify({
            email,
            password,
            registerRole,
          })
        });
      
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }
        // Obtenemos los datos enviados por el backend
        const data = await response.json();
        console.log("Datos recibidos", data);
        const { token, role, username, uid, pass } = data;
      
        // Guardamos el token localmente si quieres usarlo en peticiones futuras
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("username", username);
        localStorage.setItem("uid", uid);
        localStorage.setItem("password", pass);
      
        toast.success(`Bienvenido ${role}`);
        router.push("/Perfil");
      
      } catch (error) {
        console.error("Error en autenticación:", error);
        toast.error("Error al iniciar sesión. Revisa tus credenciales.");
      }
    }
  };

  useEffect(() => {
    
  }, [])
  

  return (
    <Container>
      <Logo src="/logo.svg" alt="Logo" />
      <Form onSubmit={handleSubmit}>
        <Botoneselección>
          <ElegirUsu
            title="Fan"
            imageSrc="prettyButtons/fan.png"
            bgColor={role === "fan" ? "#28a745" : "#A8DADC"}
            onClick={() => {
              setRole("fan");
              setRegisterRole("fan");
            }}
          />
          <ElegirUsu
            title="Artista"
            imageSrc="prettyButtons/artista.png"
            bgColor={role === "artista" ? "#28a745" : "#F4A261"}
            onClick={() => {
              setRole("artista");
              setRegisterRole("artista");
            }}
          />
        </Botoneselección>
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
        <Input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          $errorInputs={confirmPasswordError}
        />
        {/* Añadimos un checkbox para aceptar los términos y condiciones */}
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />
          <span>He leído y acepto los términos y condiciones</span>
        </CheckboxContainer>
        <ButtonContainer>
          <PrimaryButton
            type="submit"
            text={"Registrarse"}
            onClick={manejadorInputs}
          />
        </ButtonContainer>
      </Form>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </Container>
  );
};

export default SignUpView;
