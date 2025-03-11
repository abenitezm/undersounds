"use client";

import { useState } from "react";
import colors from "../colors";
import styled from "styled-components";

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

const AccountForm = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    securePassword: "",
    bio: "",
    location: "",
    websites: "",
    accountEmail: "",
    emailForFans: "",
    preferredLanguage: "",
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

  const [changesSaved, setChangesSaved] = useState(false);

  const validateFields = () => {
    let allFieldsValid = true;
    // Check if the username is empty
    const newErrors = { ...errors };

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
      setChangesSaved(true);

      setTimeout(() => {
        setChangesSaved(false);
      }, 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({
      ...inputs, // Mantengo el resto de campos con el valor que tienen
      [name]: value, // Actualizo el campo que ha cambiado
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // previene que recargue la página y perdamos la info
    validateFields();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SectionInfo>
        <SectionTitle>Profile info</SectionTitle>
        <SectionSubtitle>Change your profile basic info</SectionSubtitle>
      </SectionInfo>
      <FormItem>
        <FormLabel>Account name</FormLabel>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="text"
          name="username"
        />
        <ErrorMessages>
          {errors.usernameLength && errorMessages.usernameLength}
          {errors.usernameRegex && errorMessages.usernameRegex}
        </ErrorMessages>
      </FormItem>
      <FormItem>
        <FormLabel>Account email</FormLabel>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="email"
          name="accountEmail"
        />
        <ErrorMessages>
          {errors.emailRegex && errorMessages.emailRegex}
        </ErrorMessages>
      </FormItem>

      <SectionInfo>
        <SectionTitle>Security</SectionTitle>
        <SectionSubtitle>Update your password</SectionSubtitle>
      </SectionInfo>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <FormItem>
          <FormLabel>Change password</FormLabel>
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
          <FormLabel>Confirm password</FormLabel>
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

      <SectionInfo>
        <SectionTitle>Additional info</SectionTitle>
        <SectionSubtitle>Let your fans know more about you!</SectionSubtitle>
      </SectionInfo>

      <FormItem>
        <FormLabel>Bio</FormLabel>
        <textarea
          style={styles.formInput}
          onChange={handleChange}
          name="bio"
          rows={5}
        />
      </FormItem>
      <FormItem>
        <FormLabel>Email for fans</FormLabel>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="email"
          name="emailForFans"
        />
        <ErrorMessages>
          {errors.fanEmailRegex && errorMessages.fanEmailRegex}
        </ErrorMessages>
      </FormItem>
      <FormItem>
        <FormLabel>Location</FormLabel>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="text"
          name="location"
        />
      </FormItem>

      <FormItem>
        <FormLabel>Websites</FormLabel>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="text"
          name="website"
        />
      </FormItem>

      <SectionInfo>
        <SectionTitle>Preferences</SectionTitle>
        <SectionSubtitle>Customize your experience</SectionSubtitle>
      </SectionInfo>

      <FormItem>
        <FormLabel>Preferred language</FormLabel>
        <select
          style={styles.formInput}
          name="preferredLanguage"
          onChange={handleChange}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </FormItem>

      <FormItem
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <FormLabel>Dark mode</FormLabel>
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
          defaultChecked={inputs.darkMode || false}
        />
      </FormItem>

      <Button type="submit">Save settings</Button>
      {changesSaved && (
        <ConfirmMessage>Your changes have been saved!</ConfirmMessage>
      )}

      <DeleteButton
        type="button"
        onClick={() => {
          console.log("Delete profile");
        }}
      >
        Delete profile
      </DeleteButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;
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
  margin: 0 auto;
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
  color: ${colors.secondary};
  margin: 0 auto;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
  margin: 0 auto;
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
