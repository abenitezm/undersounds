"use client";

import { useState } from "react";
import colors from "../../app/colors";
import styled from "styled-components";

const NotificationsForm = () => {
  const [inputs, setInputs] = useState({
    sellAlbumEmail: false,
    sellAlbumWeb: false,
    sellMerchEmail: false,
    sellMerchWeb: false,
    reviewEmail: false,
    reviewWeb: false,
    followEmail: false,
    followWeb: false,
    artistMusicEmail: false,
    artistMusicWeb: false,
    artistDiscountEmail: false,
    artistDiscountWeb: false,
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
    const value = (e.target as HTMLInputElement).checked;
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
        <SectionTitle>Artistas</SectionTitle>
        <SectionSubtitle>Notificaciones sobre tu música</SectionSubtitle>
      </SectionInfo>
      <FormItem>
        <FormLabel>Recibir notificaciones al vender un álbum</FormLabel>
        <FormItemRow>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Email</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="sellAlbumEmail"
              defaultChecked={inputs.sellAlbumEmail}
            />
          </FormItem>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Web</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="sellAlbumWeb"
              defaultChecked={inputs.sellAlbumWeb}
            />
          </FormItem>
        </FormItemRow>
      </FormItem>
      <FormItem>
        <FormLabel>Recibir notificaciones al vender merch</FormLabel>
        <FormItemRow>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Email</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="sellMerchEmail"
              defaultChecked={inputs.sellMerchEmail}
            />
          </FormItem>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Web</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="sellMerchWeb"
              defaultChecked={inputs.sellMerchWeb}
            />
          </FormItem>
        </FormItemRow>
      </FormItem>
      <Separator />
      <FormItem>
        <FormLabel>Recibir notificaciones al recibir una reseña</FormLabel>
        <FormItemRow>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Email</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="reviewEmail"
              defaultChecked={inputs.reviewEmail}
            />
          </FormItem>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Web</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="reviewWeb"
              defaultChecked={inputs.reviewWeb}
            />
          </FormItem>
        </FormItemRow>
      </FormItem>

      <FormItem>
        <FormLabel>Recibir notificaciones cuando alguien te sigue</FormLabel>
        <FormItemRow>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Email</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="followEmail"
              defaultChecked={inputs.followEmail}
            />
          </FormItem>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Web</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="followWeb"
              defaultChecked={inputs.followWeb}
            />
          </FormItem>
        </FormItemRow>
      </FormItem>

      <SectionInfo>
        <SectionTitle>Oyentes</SectionTitle>
        <SectionSubtitle>
          Notificaciones sobre tus artistas favoritos
        </SectionSubtitle>
      </SectionInfo>

      <FormItem>
        <FormLabel>
          Recibir notificaciones cuando tus artistas suben música
        </FormLabel>
        <FormItemRow>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Email</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="artistMusicEmail"
              defaultChecked={inputs.artistMusicEmail}
            />
          </FormItem>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Web</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="artistMusicWeb"
              defaultChecked={inputs.artistMusicWeb}
            />
          </FormItem>
        </FormItemRow>
      </FormItem>
      <FormItem>
        <FormLabel>
          Recibir notificaciones cuando un artista tiene descuentos
        </FormLabel>
        <FormItemRow>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Email</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="artistDiscountEmail"
              defaultChecked={inputs.artistDiscountEmail}
            />
          </FormItem>
          <FormItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormLabel>Web</FormLabel>
            <input
              style={{
                ...styles.formInput,
                width: "auto",
                marginLeft: 10,
                resize: "none",
              }}
              onChange={handleChange}
              type="checkbox"
              name="artistDiscountWeb"
              defaultChecked={inputs.artistDiscountWeb}
            />
          </FormItem>
        </FormItemRow>
      </FormItem>

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
  width: 85%;
  flex-direction: row;
  justify-content: space-between;
`;

const FormItemRow = styled.div`
  display: flex;
  justifiy-content: center;
  gap: 50px;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  margin: 2px;
`;

const Separator = styled.div`
  width: 88%;
  height: 1px;
  opacity: 0.1;
  margin-left: 5px;
  background-color: ${colors.secondary};
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


const styles = {
  formInput: {
    borderRadius: 5,
    border: "none",
    padding: "5px 10px",
    width: "60%",
  },
};

export default NotificationsForm;
