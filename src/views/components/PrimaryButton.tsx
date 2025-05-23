'use client';

import React from "react";
import colors from "../../app/colors";
import { styled } from "styled-components";

const Button = styled.button`
    background-color: ${colors.primary};
    border: none;
    color: ${colors.secondary};
    border-radius: 20px;
    font-size: 20px;
    padding: 10px 30px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: ${colors.secondary};
        color: ${colors.background};
        transform: scale(1.05);
    }
`;

type ButtonProps = {
    text: string;
    onClick: () => void;
    type: "button" | "submit" | "reset";
    style ?: React.CSSProperties
}

export default function PrimaryButton({ text, onClick, style, type = 'button' }: ButtonProps) {
    return (
        <Button onClick={onClick} type={type} style={style}>
            {text}
        </Button>
    );
};