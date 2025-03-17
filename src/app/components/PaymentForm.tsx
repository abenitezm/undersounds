"use client";

import { useState } from "react";
import colors from "../colors";
import styled from "styled-components";

const PaymentForm = () => {
  const [inputs, setInputs] = useState({
    preferredPaymentMethod: "paypal",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const [changesSaved, setChangesSaved] = useState(false);

  const validateFields = () => {
    console.log(inputs);
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // previene que recargue la página y perdamos la info
    validateFields();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SectionInfo>
        <SectionTitle>Método de pago</SectionTitle>
        <SectionSubtitle>Cambia tu método de pago</SectionSubtitle>
      </SectionInfo>
      <FormItem>
        <FormLabel>Método de pago</FormLabel>
        <select
          style={{ ...styles.formInput, width: "20%" }}
          name="preferredPaymentMethod"
          onChange={handleChange}
        >
          <option value="paypal">PayPal</option>
          <option value="card">Tarjeta</option>
        </select>
      </FormItem>

      <SectionInfo>
        <SectionTitle>Tarjeta</SectionTitle>
        <SectionSubtitle>Cambia tu tarjeta</SectionSubtitle>
      </SectionInfo>

      <FormItem>
        <FormLabel>Número de tarjeta</FormLabel>
        <input
          style={styles.formInput}
          onChange={handleChange}
          type="text"
          maxLength={19}
          name="cardNumber"
        />
      </FormItem>
      <FormItemRow>
        <FormItem>
          <FormLabel>Fecha de caducidad</FormLabel>
          <input
            style={{...styles.formInput, width: "100%"}}
            onChange={handleChange}
            type="month"
            name="expirationDate"
          />
        </FormItem>
        <FormItem>
          <FormLabel>CVC</FormLabel>
          <input
            style={{ ...styles.formInput, width: "30%" }}
            onChange={handleChange}
            type="text"
            maxLength={4}
            name="cvc"
          />
        </FormItem>
      </FormItemRow>

      <Button type="submit">Guardar configuración</Button>
      {changesSaved && (
        <ConfirmMessage>¡Tus cambios se han guardado!</ConfirmMessage>
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
  flex-direction: column;
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
  margin-top: 20px;
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

const FormItemRow = styled.div`
  display: flex;
  gap: 80px;
`;

const styles = {
  formInput: {
    borderRadius: 5,
    border: "none",
    padding: "5px 10px",
    width: "60%",
  },
};

export default PaymentForm;
