"use client";

import { useState } from "react";
import colors from "../../app/colors";
import styled from "styled-components";

import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";

// Objeto con todos los mensajes de error, para facilitar hacer cambios en los mensajes
const errorMessages = {
  usernameLength: (
    <span>El nombre de usuario debe contener al menos 5 caracteres</span>
  ),
  usernameRegex: (
    <span>El nombre de usuario sólo puede contener letras y números</span>
  ),
  emailRegex: <span>Formato de email inválido</span>,
  passwordRegex: <span>La contraseña debe contener al menos un número</span>,
  passwordLength: (
    <span>La contraseña debe contener al menos 8 caracteres</span>
  ),
  securePasswordRequired: <span>Confirma la contraseña</span>,
  passwordsMatch: <span>Las contraseñas no coinciden</span>,
  fanEmailRegex: <span>Formato de email inválido</span>,
};

const AccountForm = ({ userData }) => {
  const [inputs, setInputs] = useState({
    username: userData.username,
    password: userData.password,
    securePassword: "",
    bio: userData.biography,
    location: userData.location,
    website: userData.website,
    accountEmail: userData.email,
    emailForFans: userData.emailForFans,
    preferredLanguage: userData.language,
    darkMode: false,
  });

  const [errors, setErrors] = useState({
    usernameLength: false,
    usernameRegex: false,
    emailRegex: false,
    passwordRegex: false,
    passwordLength: false,
    securePasswordRequired: false,
    passwordsMatch: false,
    fanEmailRegex: false,
  });

  const [profileChangesSaved, setProfileChangesSaved] = useState(false);
  const [securityChangesSaved, setSecurityChangesSaved] = useState(false);
  const [additionalInfoChangesSaved, setAdditionalInfoChangesSaved] =
    useState(false);
  const [preferencesChangesSaved, setPreferencesChangesSaved] = useState(false);
  const validateFields = (type: string) => {
    const newErrors = { ...errors };
    let allFieldsValid = true;
    switch (type) {
      case "Perfil":
        // Check if the username is at least 5 characters
        if (inputs.username != "" && inputs.username.length < 5) {
          newErrors.usernameLength = true;
          allFieldsValid = false;
        } else {
          newErrors.usernameLength = false;
        }
        // Check if the username contains only letters and numbers
        if (inputs.username != "" && !inputs.username.match(/^[a-zA-Z0-9]+$/)) {
          newErrors.usernameRegex = true;
          allFieldsValid = false;
        } else {
          newErrors.usernameRegex = false;
        }

        // Check if the email is valid
        if (
          inputs.accountEmail != "" &&
          !inputs.accountEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ) {
          newErrors.emailRegex = true;
          allFieldsValid = false;
        } else {
          newErrors.emailRegex = false;
        }
        setErrors(newErrors);

        if (allFieldsValid) {
          console.log(inputs);
          setProfileChangesSaved(true);

          setTimeout(() => {
            setProfileChangesSaved(false);
          }, 3000);
        }
        break;
      case "Seguridad":
        // Check if the password is at least 8 characters
        if (inputs.password != "" && inputs.password.length < 8) {
          newErrors.passwordLength = true;
          allFieldsValid = false;
        } else {
          newErrors.passwordLength = false;
        }

        // Check if the password contains at least one number
        if (inputs.password != "" && !inputs.password.match(/\d/)) {
          newErrors.passwordRegex = true;
          allFieldsValid = false;
        } else {
          newErrors.passwordRegex = false;
        }

        // Check if the secure password is empty
        if (inputs.password != "" && !inputs.securePassword) {
          newErrors.securePasswordRequired = true;
          allFieldsValid = false;
        } else {
          newErrors.securePasswordRequired = false;
        }
        // Check if the password and secure password are the same
        if (inputs.password !== inputs.securePassword) {
          newErrors.passwordsMatch = true;
          allFieldsValid = false;
        } else {
          newErrors.passwordsMatch = false;
        }
        setErrors(newErrors);

        if (allFieldsValid) {
          console.log(inputs);
          setSecurityChangesSaved(true);

          setTimeout(() => {
            setSecurityChangesSaved(false);
          }, 3000);
        }
        break;
      case "Información adicional":
        // Check if the fan email is valid
        if (
          inputs.emailForFans &&
          !inputs.emailForFans.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        ) {
          newErrors.fanEmailRegex = true;
          allFieldsValid = false;
        } else {
          newErrors.fanEmailRegex = false;
        }
        setErrors(newErrors);
        if (allFieldsValid) {
          console.log(inputs);
          setAdditionalInfoChangesSaved(true);

          setTimeout(() => {
            setAdditionalInfoChangesSaved(false);
          }, 3000);
        }
        break;
      case "Preferencias":
        if (allFieldsValid) {
          console.log(inputs);
          setPreferencesChangesSaved(true);

          setTimeout(() => {
            setPreferencesChangesSaved(false);
          }, 3000);
        }
      default:
        break;
    }

    setErrors(newErrors);
    if (allFieldsValid) {
      saveSettings(type);
    }
  };

  const userRole =
    localStorage.getItem("registerRole") || userData.register_role;

  const saveSettings = async (type: string) => {
    console.log(`Saving ${type} settings...`);
    let response, data;
    // Aquí puedes agregar la lógica para guardar los cambios en el backend o en el localStorage
    switch (type) {
      case "Perfil":
        response = await fetch(
          `http://localhost:8000/updateuser/${userData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: inputs.username,
              email: inputs.accountEmail,
            }),
          }
        );
        data = await response.json();
        console.log(data);
        const prevUsername = localStorage.getItem("username");
        if (prevUsername !== inputs.username) {
          localStorage.setItem("username", inputs.username);
        }
        if (userRole === "artista") {
          response = await fetch(
            `http://localhost:8000/updateartist/${userData.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: inputs.username,
              }),
            }
          );
          data = await response.json();
          console.log(data);
        }

        break;
      case "Seguridad":
        console.log(inputs.password);
        response = await fetch(
          `http://localhost:8000/updateuser/${userData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: inputs.password,
            }),
          }
        );
        data = await response.json();
        console.log(data);
        break;
      case "Información adicional":
        response = await fetch(
          `http://localhost:8000/updateuser/${userData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              biography: inputs.bio,
              location: inputs.location,
              website: inputs.website,
              emailForFans: inputs.emailForFans,
            }),
          }
        );
        data = await response.json();
        console.log(data);

        response = await fetch(
          `http://localhost:8000/updateartist/${userData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              info: inputs.bio,
              location: inputs.location,
              website: inputs.website,
              emailForFans: inputs.emailForFans,
            }),
          }
        );
        data = await response.json();
        console.log(data);
        break;
      case "Preferencias":
        response = await fetch(
          `http://localhost:8000/updateuser/${userData.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              language: inputs.preferredLanguage,
              darkMode: inputs.darkMode,
            }),
          }
        );
        data = await response.json();
        console.log(data);
        break;
      default:
        break;
    }
  };

  console.log(userData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    if (name === "darkMode") {
      setInputs({
        ...inputs,
        [name]: (e.target as HTMLInputElement).checked,
      });
      return;
    }
    const value = e.target.value;
    setInputs({
      ...inputs, // Mantengo el resto de campos con el valor que tienen
      [name]: value, // Actualizo el campo que ha cambiado
    });
  };

  const submitForm = (type: string) => {
    validateFields(type);
  };

  return (
    <Form>
      <SectionContainer>
        <SectionInfo>
          <SectionTitle>Perfil</SectionTitle>
          <SectionSubtitle>Cambia la información de tu perfil</SectionSubtitle>
        </SectionInfo>
        <FormItem>
          <FormLabel>Nombre de usuario</FormLabel>
          <input
            style={styles.formInput}
            onChange={handleChange}
            type="text"
            name="username"
            defaultValue={userData.username}
          />
          <ErrorMessages>
            {errors.usernameLength && errorMessages.usernameLength}
            {errors.usernameRegex && errorMessages.usernameRegex}
          </ErrorMessages>
        </FormItem>
        <FormItem>
          <FormLabel>Email de usuario</FormLabel>
          <input
            style={styles.formInput}
            onChange={handleChange}
            type="email"
            name="accountEmail"
            defaultValue={userData.email}
          />
          <ErrorMessages>
            {errors.emailRegex && errorMessages.emailRegex}
          </ErrorMessages>
        </FormItem>
        <Button type="button" onClick={() => submitForm("Perfil")}>
          {" "}
          Guardar <SaveIcon style={{ marginLeft: 15, fontSize: 16 }} />{" "}
        </Button>
        {profileChangesSaved && (
          <ConfirmMessage>
            <DoneIcon style={{ marginRight: 5, fontSize: 16 }} /> Cambios
            guardados!
          </ConfirmMessage>
        )}
      </SectionContainer>

      <SectionContainer>
        <SectionInfo>
          <SectionTitle>Seguridad</SectionTitle>
          <SectionSubtitle>Actualiza tu contraseña</SectionSubtitle>
        </SectionInfo>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <FormItem>
            <FormLabel>Cambiar contraseña</FormLabel>
            <input
              style={styles.formInput}
              onChange={handleChange}
              type="password"
              name="password"
            />
            <ErrorMessages>
              {errors.passwordLength && errorMessages.passwordLength}
              {errors.passwordRegex && errorMessages.passwordRegex}
            </ErrorMessages>
          </FormItem>

          <FormItem>
            <FormLabel>Confirmar contraseña</FormLabel>
            <input
              style={styles.formInput}
              onChange={handleChange}
              type="password"
              name="securePassword"
            />
            <ErrorMessages>
              {errors.securePasswordRequired &&
                errorMessages.securePasswordRequired}
              {errors.passwordsMatch && errorMessages.passwordsMatch}
            </ErrorMessages>
          </FormItem>
        </div>
        <Button type="button" onClick={() => submitForm("Seguridad")}>
          {" "}
          Guardar <SaveIcon style={{ marginLeft: 15, fontSize: 16 }} />
        </Button>
        {securityChangesSaved && (
          <ConfirmMessage>
            <DoneIcon style={{ marginRight: 5, fontSize: 16 }} /> Cambios
            guardados!
          </ConfirmMessage>
        )}
      </SectionContainer>
      {userRole === "artista" && (
        <SectionContainer>
          <SectionInfo>
            <SectionTitle>Información adicional</SectionTitle>
            <SectionSubtitle>¡Cuéntales algo de ti a tus fans!</SectionSubtitle>
          </SectionInfo>

          <FormItem>
            <FormLabel>Biografía</FormLabel>
            <textarea
              style={styles.formInput}
              onChange={handleChange}
              name="bio"
              defaultValue={userData.biography}
              rows={5}
            />
          </FormItem>
          <FormItem>
            <FormLabel>Email para fans</FormLabel>
            <input
              style={styles.formInput}
              onChange={handleChange}
              type="email"
              name="emailForFans"
              defaultValue={userData.emailForFans}
            />
            <ErrorMessages>
              {errors.fanEmailRegex && errorMessages.fanEmailRegex}
            </ErrorMessages>
          </FormItem>
          <FormItem>
            <FormLabel>Localización</FormLabel>
            <input
              style={styles.formInput}
              onChange={handleChange}
              type="text"
              name="location"
              defaultValue={userData.location}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Sitio web</FormLabel>
            <input
              style={styles.formInput}
              onChange={handleChange}
              type="text"
              name="website"
              defaultValue={userData.website}
            />
          </FormItem>
          <Button
            type="button"
            onClick={() => submitForm("Información adicional")}
          >
            {" "}
            Guardar
            <SaveIcon style={{ marginLeft: 15, fontSize: 16 }} />
          </Button>
          {additionalInfoChangesSaved && (
            <ConfirmMessage>
              <DoneIcon style={{ marginRight: 5, fontSize: 16 }} /> Cambios
              guardados!
            </ConfirmMessage>
          )}
        </SectionContainer>
      )}

      <SectionContainer>
        <SectionInfo>
          <SectionTitle>Preferencias</SectionTitle>
          <SectionSubtitle>Personaliza tu experiencia</SectionSubtitle>
        </SectionInfo>

        <FormItem>
          <FormLabel>Idioma</FormLabel>
          <select
            style={{ ...styles.formInput, width: "20%" }}
            name="preferredLanguage"
            defaultValue={userData.language}
            onChange={handleChange}
          >
            <option value="en">Inglés</option>
            <option value="es">Español</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
          </select>
        </FormItem>

        <FormItem
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <FormLabel>Modo oscuro</FormLabel>
          <input
            style={{
              ...styles.formInput,
              width: "auto",
              marginLeft: 10,
              resize: "none",
            }}
            onChange={handleChange}
            type="checkbox"
            name="darkMode"
            defaultChecked={userData.darkMode || false}
          />
        </FormItem>

        <Button type="button" onClick={() => submitForm("Preferencias")}>
          Guardar
          <SaveIcon style={{ marginLeft: 15, fontSize: 16 }} />
        </Button>
        {preferencesChangesSaved && (
          <ConfirmMessage>
            <DoneIcon style={{ marginRight: 5, fontSize: 16 }} />
            Cambios guardados!
          </ConfirmMessage>
        )}
      </SectionContainer>
      <SectionContainer>
        <SectionInfo>
          <SectionTitle>Borrar tu cuenta</SectionTitle>
          <SectionSubtitle>Fue bonito mientras duró :(</SectionSubtitle>
        </SectionInfo>
        <DeleteButton
          type="button"
          onClick={() => {
            console.log("Delete profile");
          }}
        >
          Borrar perfil
        </DeleteButton>
      </SectionContainer>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  margin-left: 5px;
  width: 90%;
`;

const SectionInfo = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  gap: 15px;
  margin-top: 20px;
  align-items: baseline;
  border-bottom: 1px solid ${colors.secondary};
  padding-bottom: 0.2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 5px;
`;

const SectionSubtitle = styled.span`
  font-size: 0.8rem;
  color: ${colors.secondary};
  opacity: 0.6;
`;

const FormItem = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 5;
`;

const FormLabel = styled.label`
  font-size: 14;
  margin: 2px;
  margin-bottom: 4px;
`;

const ErrorMessages = styled.div`
  display: flex;
  margin-top: 5px;
  margin-left: 5px;
  flex-direction: column;
  gap: 5px;
  color: red;
  font-weight: bold;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.background};
  }
`;

const ConfirmMessage = styled.span`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  color: ${colors.secondary};
  margin: 0 auto;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  margin-left: 20px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.1s ease-in-out;
  &:hover {
    background-color: #ec5353;
  }
`;

const styles = {
  formInput: {
    borderRadius: 5,
    border: "none",
    padding: "5px 10px",
    width: "60%",
  },
};

export default AccountForm;
