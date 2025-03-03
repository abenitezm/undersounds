'use client';

import React from "react";
import colors from "../colors";
import { styled } from "styled-components";

const Button = styled.button`
    background-color: ${colors.tertiary};
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
}

export default function PrimaryButton({ text, onClick }: ButtonProps) {
    return (
        <Button onClick={onClick}>
            {text}
        </Button>
    );
};