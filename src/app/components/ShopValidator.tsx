'use client';

import React, {useState} from "react";
import { keyframes, styled } from "styled-components";
import colors from "../colors";
import "react-toastify/ReactToastify.css";
import { motion } from "framer-motion";
import {toast, ToastContainer } from "react-toastify";
import { duration } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { OnApproveData, OnApproveActions } from "@paypal/paypal-js";

const animacionEntrada = keyframes`
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
`;

const DeployBackground = styled.div<{ $isOpen : boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px); // Agrega un desenfoque al fondo
    display: ${({$isOpen}) => ($isOpen ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

const DeployContent = styled.div`
    background: ${colors.background};
    color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
    animation: ${animacionEntrada} 0.3s ease-in-out;
    position: relative;
    max-width: 700px;
    height: 70vh;
    width: 90%;
    text-align: center;
    z-index: 101;
`;

const BotonCerrar = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: ${colors.background};
    color: ${colors.secondary};
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background: ${colors.primary};
    }
`;

const ContenedorPasos = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    background: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    position: relative;
`;

const animacionPasos = {
    initial: { opacity: 0, y: 20 }, // Empieza con opacidad 0 y un poco más abajo
    animate: { opacity: 1, y: 0 }, // Se hace visible y sube suavemente
    exit: { opacity: 0, y: -20 },  // Desvanece y sube un poco al salir
    transition: { duration: 0.5, ease: "easeInOut" },
};

const BotonConfirmar = styled.div`
    background: ${colors.primary}; 
    color: white; 
    padding: 10px 20px; 
    border-radius: 10px; 
    border: none; 
    cursor: pointer; 
    margin-top: 10px;
`;

const ImagenProducto = styled.img`
    width: 187px;
    height: 187px;
    border-radius: 10px;
    object-fit: cover;
`;

const TextoStock = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

type ShopValidatorpProps = {
    isOpen : boolean;
    onClose : () => void;
    imagen : any;
}

const InputStyled = styled.input<{ $errorInputs : boolean}>`
    border: 2px solid ${({$errorInputs}) => ($errorInputs ? "red" : "${colors.primary}")};
    padding: 10px;
    border-radius: 5px;
`;

export default function ShopValidator({isOpen, onClose, imagen} : ShopValidatorpProps){
    
    const [pasosValidacion, setPasosValidacion] = useState(0);
    const [stock, setStock] = useState(3);
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [errorInputs, setErrorInputs] = useState(false);
    const [transaccionCompletada, setTransaccionCompletada] = useState(false);

    const manejadorInputs = () => {
        if (!direccion && !telefono){
            console.log("Hola");
            toast.error("Tienes que introducir valores en los dos campos");
            setErrorInputs(!errorInputs);
            console.log(errorInputs);
        } else {
            setPasosValidacion(2);
        }
    };

    //Datos necesarios para la validación con PayPal
    interface Datos {
        orderID: string;
    }
    //Acciones que se tomarán con los datos solicitados en el PayPal

    //Función que comprueba los datos del pedido y valida si se ha realizado correctamente
    const aprobadaTransferencia = async(datos: OnApproveData, actions: OnApproveActions) => {
        if (actions.order) {
            return actions.order.capture().then(() => {
            setTransaccionCompletada(true);
            toast.success("Pago realizado exitosamente");
            setPasosValidacion(2);
            });
        } else {
            return Promise.reject(new Error("Order is undefined"));
        }
    };

    return (
        <DeployBackground $isOpen = {isOpen}>
            <DeployContent>
                {pasosValidacion === 0 && (
                    <ContenedorPasos
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={animacionPasos}
                    >
                        <h3>Has seleccionado el siguiente artículo</h3>
                        <ImagenProducto src = {imagen.imagen} alt = "imagen merch" style={{
                            width: "187px",
                            height: "187px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            borderRadius: "10px"
                        }}/>
                        <BotonCerrar onClick={onClose}>✖</BotonCerrar>
                        { stock > 0 ? (
                            <div style={{textAlign:"center"}}>
                                <TextoStock>Unidades disponibles : {stock}</TextoStock>
                                <motion.div
                                    whileHover={{ scale : 1.2}}
                                    whileTap={{ scale: 0.8}}
                                ><BotonConfirmar onClick={() => setPasosValidacion(1)}>
                                    Siguiente
                                </BotonConfirmar></motion.div>
                            </div>
                        ) : (
                            <div style={{textAlign:"center"}}>
                                <TextoStock style={{ color: "red"}}> Producto Agotado</TextoStock>
                                <motion.div
                                    whileHover={{ scale : 1.2}}
                                    whileTap={{ scale: 0.8}}
                                >
                                    <BotonConfirmar onClick={onClose}>
                                        Salir
                                    </BotonConfirmar>
                                </motion.div>
                            </div>
                        )}
                        
                    </ContenedorPasos>
                )}
                {pasosValidacion === 1 && (
                    <ContenedorPasos
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={animacionPasos}
                    >
                        <BotonCerrar onClick={onClose}>✖</BotonCerrar>
                        <h2>Datos de Envío</h2>
                        <p>Por favor, introduce tu dirección y contacto.</p>
                        <ToastContainer position="bottom-center" autoClose={3000}/>
                        <InputStyled type = "text" placeholder="Dirección" onChange={(e) => setDireccion(e.target.value)} $errorInputs={errorInputs}/>
                        <InputStyled type = "text" placeholder="Teléfono" onChange={(e) => setTelefono(e.target.value)} $errorInputs={errorInputs}/>
                        <motion.div
                            whileHover={{ scale : 1.2}}
                            whileTap={{ scale: 0.8}}
                        ><BotonConfirmar onClick={manejadorInputs}>
                            Siguiente
                        </BotonConfirmar></motion.div>
                    </ContenedorPasos>
                )}
                {pasosValidacion === 2 && (
                    <ContenedorPasos
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={animacionPasos}
                    >
                        <BotonCerrar onClick={onClose}>✖</BotonCerrar>
                        <h2>Selección de método de pago</h2>
                        <button onClick={() => setPasosValidacion(3)}>Tarjeta</button>
                        <PayPalScriptProvider options={{clientId: "test"}}>
                            <PayPalButtons style={{layout: "horizontal", borderRadius: 5 }} createOrder={(datos, actions) => {
                                return actions.order.create({
                                    intent: "CAPTURE",
                                    purchase_units:[
                                        {
                                            amount: {currency_code: "USD", value: "25.00"}, //Crea la unidad que quiero comprar
                                        },
                                    ],
                                })
                            }}
                            onApprove={aprobadaTransferencia} //Captura la orden y confirma el pago
                            />
                        </PayPalScriptProvider>
                        <button onClick={() => setPasosValidacion(3)}>Transferencia</button>
                    </ContenedorPasos>
                )}
                {pasosValidacion === 3 && (
                    <ContenedorPasos
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={animacionPasos}
                    >
                        <h2>Resumen de compra</h2>
                        <p>Producto : {imagen.titulo}</p>
                        <p>Precio : {imagen.precio}</p>
                        
                        <motion.div
                            whileHover={{ scale : 1.2}}
                            whileTap={{ scale: 0.8}}
                        ><BotonConfirmar onClick={() => {setPasosValidacion(4), setStock(stock-1)}}>
                            Siguiente
                        </BotonConfirmar></motion.div>
                    </ContenedorPasos>
                )}
                {pasosValidacion === 4 && (
                    <ContenedorPasos
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={animacionPasos}
                    >
                        <BotonCerrar onClick={onClose}>✖</BotonCerrar>
                        <h2>Compra realizada con éxito  🎉</h2>
                        <p>Recibirás un correo con los detalles</p>
                        <motion.div
                            whileHover={{ scale : 1.2}}
                            whileTap={{ scale: 0.8}}
                        ><BotonConfirmar onClick={onClose}>
                            Cerrar
                        </BotonConfirmar></motion.div>
                    </ContenedorPasos>
                )}
            </DeployContent>
        </DeployBackground>
    );
}