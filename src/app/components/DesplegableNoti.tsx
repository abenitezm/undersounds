'use client';
import styled from "styled-components";
import colors from "../colors";
import Notificación from "./Notificación";

const DropdownContainer = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    top: 65px;
    right: 100px;
    background-color: ${colors.background};
    border: 1px solid ${colors.primary};
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    display: ${props => (props.$isVisible ? 'block' : 'none')};
`;

type NotificacionesDropdownProps = {
    visible: boolean;
    notificaciones: { id: number; message: string }[];
    onClose: (id: number) => void;
};

export default function NotificacionesDropdown({ visible, notificaciones, onClose }: NotificacionesDropdownProps) {
    return (
        <DropdownContainer $isVisible={visible}>
            {notificaciones.map(notificación => (
                <Notificación
                    key={notificación.id}
                    message={notificación.message}
                    onClose={() => onClose(notificación.id)}
                />
            ))}
        </DropdownContainer>
    );
}