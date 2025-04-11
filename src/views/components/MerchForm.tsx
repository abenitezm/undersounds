"use client";

import { useState } from "react";
import colors from "../../app/colors";
import styled from "styled-components";

const MerchForm = ({ userData }) => {
  const [inputs, setInputs] = useState({
    senderName: userData.senderName || "",
    senderAddress: userData.senderAddress || "",
    shippingDays: userData.shippingDays || 1,
    shippingMethod: userData.shippingMethod || "seur",
  });

  const [changesSaved, setChangesSaved] = useState(false);

  const saveSettings = async () => {
    console.log(inputs);

    const response = await fetch(
      `http://127.0.0.1:8000/updateuser/${userData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderName: inputs.senderName,
          senderAddress: inputs.senderAddress,
          shippingDays: inputs.shippingDays,
          shippingMethod: inputs.shippingMethod,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    setChangesSaved(true);

    setTimeout(() => {
      setChangesSaved(false);
    }, 3000);
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

  const submitForm = () => {
    saveSettings();
  };

  return (
    <Form>
      <SectionInfo>
        <SectionTitle>Datos de envío</SectionTitle>
        <SectionSubtitle>
          Información sobre la dirección del remitente
        </SectionSubtitle>
      </SectionInfo>
      <FormItem>
        <FormLabel>Nombre del remitente</FormLabel>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="text"
          defaultValue={inputs.senderName}
          name="senderName"
        />
      </FormItem>
      <FormItem>
        <FormLabel>Dirección del remitente</FormLabel>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="text"
          defaultValue={inputs.senderAddress}
          name="senderAddress"
        />
      </FormItem>
      <FormItem>
        <FormLabel>Días para enviar el paquete</FormLabel>
        <input
          style={{ ...styles.formInput, width: "10%" }}
          onChange={handleChange}
          type="number"
          min={1}
          max={30}
          defaultValue={inputs.shippingDays}
          name="shippingDays"
        />
      </FormItem>
      <FormItem>
        <FormLabel>Método de envío</FormLabel>
        <select
          style={{ ...styles.formInput, width: "20%" }}
          name="shippingMethod"
          defaultValue={inputs.shippingMethod}
          onChange={handleChange}
        >
          <option value="seur">SEUR</option>
          <option value="ups">UPS</option>
          <option value="mrw">MRW</option>
        </select>
      </FormItem>

      <Button type="button" onClick={submitForm}>
        Save settings
      </Button>
      {changesSaved && (
        <ConfirmMessage>Your changes have been saved!</ConfirmMessage>
      )}
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

const styles = {
  formInput: {
    borderRadius: 5,
    border: "none",
    padding: "5px 10px",
    width: "60%",
  },
};

export default MerchForm;
