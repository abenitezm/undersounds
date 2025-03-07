"use client";

import { useState } from "react";
import colors from "../colors";

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
    usernameRequired: false,
    usernameLength: false,
    usernameRegex: false,
    emailRequired: false,
    emailRegex: false,
    passwordRequired: false,
    passwordRegex: false,
    passwordLength: false,
    securePasswordRequired: false,
    passwordsMatch: false,
    fanEmailRegex: false,
  });

  const validateFields = () => {
    let allFieldsValid = true;
    // Check if the username is empty
    let newErrors = { ...errors };
    if (!inputs.username) {
      newErrors.usernameRequired = true;
      allFieldsValid = false;
    } else {
      newErrors.usernameRequired = false;
    }

    if (inputs.username.length < 5) {
      newErrors.usernameLength = true;
      allFieldsValid = false;
    } else {
      newErrors.usernameLength = false;
    }

    if (!inputs.username.match(/^[a-zA-Z0-9]+$/)) {
      newErrors.usernameRegex = true;
      allFieldsValid = false;
    } else {
      newErrors.usernameRegex = false;
    }

    // Check if the email is empty
    if (!inputs.accountEmail) {
      newErrors.emailRequired = true;
      allFieldsValid = false;
    } else {
      newErrors.emailRequired = false;
    }

    // Check if the email is valid
    if (!inputs.accountEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.emailRegex = true;
      allFieldsValid = false;
    } else {
      newErrors.emailRegex = false;
    }

    // Check if the password is empty
    if (!inputs.password) {
      newErrors.passwordRequired = true;
      allFieldsValid = false;
    } else {
      newErrors.passwordRequired = false;
    }

    // Check if the password is at least 8 characters
    if (inputs.password.length < 8) {
      newErrors.passwordLength = true;
      allFieldsValid = false;
    } else {
      newErrors.passwordLength = false;
    }

    // Check if the password contains at least one number
    if (!inputs.password.match(/\d/)) {
      newErrors.passwordRegex = true;
      allFieldsValid = false;
    } else {
      newErrors.passwordRegex = false;
    }

    // Check if the secure password is empty
    if (!inputs.securePassword) {
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
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({
      ...inputs, // Mantengo el resto de campos con el valor que tienen
      [name]: value, // Actualizo el campo que ha cambiado
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // previene que recargue la página y perdamos la info
    validateFields();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div>
        <h2 style={styles.formSectionTitle}>Profile info</h2>
        <span style={styles.formSectionSubtitle}>
          Change your profile basic info
        </span>
      </div>
      <div style={styles.formItem}>
        <label style={styles.formLabel}>Account name:</label>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="text"
          name="username"
        />
        <div style={styles.errorMessages}>
          {errors.usernameRequired && <span>Username is required</span>}
          {errors.usernameLength && (
            <span> Username must be at least 5 characters </span>
          )}
          {errors.usernameRegex && (
            <span> Username can only contain letters and numbers </span>
          )}
        </div>
      </div>
      <div style={styles.formItem}>
        <label style={styles.formLabel}>Account email:</label>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="email"
          name="accountEmail"
        />
        <div style={styles.errorMessages}>
          {errors.emailRequired && <span> Email is required </span>}
          {errors.emailRegex && <span>Invalid email format </span>}
        </div>
      </div>

      <div>
        <h2 style={styles.formSectionTitle}>Security</h2>
        <span style={styles.formSectionSubtitle}>Update your password</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={styles.formItem}>
          <label style={styles.formLabel}>Change password:</label>
          <input
            style={styles.formInput}
            onChange={handleChange}
            type="password"
            name="password"
          />
          <div style={styles.errorMessages}>
            {errors.passwordRequired && <span>Password is required</span>}
            {errors.passwordLength && (
              <span>Password must be at least 8 characters</span>
            )}
            {errors.passwordRegex && (
              <span>Password must contain at least one number</span>
            )}
          </div>
        </div>

        <div style={styles.formItem}>
          <label style={styles.formLabel}>Confirm password:</label>
          <input
            style={styles.formInput}
            onChange={handleChange}
            type="password"
            name="securePassword"
          />
          <div style={styles.errorMessages}>
            {errors.securePasswordRequired && (
              <span>Password confirmation is required</span>
            )}
            {errors.passwordsMatch && <span>Passwords do not match</span>}
          </div>
        </div>
      </div>

      <div>
        <h2 style={styles.formSectionTitle}>Additional info</h2>
        <span style={styles.formSectionSubtitle}>
          Let your fans know more about you!
        </span>
      </div>

      <div style={styles.formItem}>
        <label style={styles.formLabel}>Bio</label>
        <textarea
          style={styles.formInput}
          onChange={handleChange}
          name="bio"
          rows={5}
        />
      </div>
      <div style={styles.formItem}>
        <label style={styles.formLabel}>Email for fans:</label>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="email"
          name="emailForFans"
        />
        <div style={styles.errorMessages}>
          {errors.fanEmailRegex && <span>Invalid email format</span>}
        </div>
      </div>
      <div style={styles.formItem}>
        <label style={styles.formLabel}>Location:</label>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="text"
          name="location"
        />
      </div>

      <div style={styles.formItem}>
        <label style={styles.formLabel}>Websites:</label>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="text"
          name="website"
        />
      </div>

      <div>
        <h2 style={styles.formSectionTitle}>Preferences</h2>
        <span style={styles.formSectionSubtitle}>
          Customize your experience
        </span>
      </div>

      <div style={styles.formItem}>
        <label style={styles.formLabel}>Preferred language:</label>
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
      </div>

      <div
        style={{
          ...styles.formItem,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <label style={styles.formLabel}>Dark mode:</label>
        <input
          style={{ ...styles.formInput, width: "auto", marginLeft: 10 }}
          onChange={handleChange}
          type="checkbox"
          name="darkMode"
          defaultChecked={inputs.darkMode || false}
        />
      </div>

      <button type="submit" style={styles.formButton}>
        Save settings
      </button>

      <button
        type="button"
        onClick={() => {
          console.log("Delete profile");
        }}
        style={styles.deleteButton}
      >
        Delete profile
      </button>
    </form>
  );
};

const styles = {
  form: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    overflow: "auto",
  },
  formSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  formSectionSubtitle: {
    fontSize: 14,
    color: colors.secondary,
    opacity: 0.85,
  },
  formItem: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: 5,
  },
  formInput: {
    borderRadius: 5,
    border: "none",
    padding: "5px 10px",
    width: "60%",
    resize: "none",
  },
  formLabel: {
    fontSize: 14,
    margin: 2,
  },
  errorMessages: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    color: "red",
    fontWeight: "bold",
    fontSize: 12,
  },
};

export default AccountForm;
