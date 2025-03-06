"use client";

import { useState } from "react";

const AccountForm = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    location: "",
    websites: "",
    accountEmail: "",
    emailForFans: "",
    preferredLanguage: "",
    darkMode: false,
  });

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
    console.log(inputs);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label>
        Account name:
        <input
        onChange={handleChange} type="text" name="username" defaultValue={inputs.username || ""} />
      </label>

      <label>
        Account email:
        <input
        onChange={handleChange}
          type="email"
          name="accountEmail"
          defaultValue={inputs.accountEmail || ""}
        />
      </label>

      <label>
        Email for fans:
        <input
        onChange={handleChange}
          type="email"
          name="emailForFans"
          defaultValue={inputs.emailForFans || ""}
        />
      </label>

      <label>
        Change password:
        <input
        onChange={handleChange} type="password" name="password" defaultValue={inputs.password || ""} />
      </label>

      <label>
        Confirm password:
        <input
        onChange={handleChange} type="password" name="password" defaultValue={inputs.password || ""} />
      </label>

      <label>
        Location:
        <input
        onChange={handleChange} type="text" name="location" defaultValue={inputs.location || ""} />
      </label>

      <label>
        Websites:
        <input
        onChange={handleChange} type="text" name="website" defaultValue={inputs.websites || ""} />
      </label>

      <label>
        Preferred language:
        <select name="preferredLanguage" onChange={handleChange} defaultValue={inputs.preferredLanguage || ""}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </label>

      <label>
        Dark mode:
        <input
        onChange={handleChange}
          type="checkbox"
          name="darkMode"
          defaultChecked={inputs.darkMode || false}
        />
      </label>

      <button type="submit">Save settings</button>

      <button
        type="button"
        onClick={() => {
          console.log("Delete profile");
        }}
      >
        Delete profile
      </button>
    </form>
  );
};

const styles = {
    form: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    }
}

export default AccountForm;
