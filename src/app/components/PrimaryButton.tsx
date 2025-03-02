'use client';

import React from "react";
import colors from "../colors";

type ButtonProps = {
    text: string;
    onClick: () => void;
}

export default function PrimaryButton({ text, onClick }: ButtonProps) {

    const styles = {
        button: {
            backgroundColor: colors.primary,
            border: 'none',
            color: colors.secondary,
            borderRadius: '20px',
            fontSize: '20px',
            padding: '10px 30px',
            fontWeight: 'bold',
            cursor: 'pointer'
        }
    };

    return (
        <button style={styles.button} onClick={onClick}>
            {text}
        </button>
    );

};