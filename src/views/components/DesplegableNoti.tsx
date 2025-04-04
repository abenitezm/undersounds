'use client';
import styled from "styled-components";
import colors from "../../app/colors";

const DropdownContainer = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    top: 65px;
    right: 180px;
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

const NotificaciónContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid ${colors.primary};
`;

const Message = styled.span`
    color: ${colors.secondary};
    font-size: 14px;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${colors.primary};
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: ${colors.secondary};
    }
`;
type NotificacionesDropdownProps = {
    visible: boolean;
    notificaciones: { id: number; message: string }[];
    onClose: (id: number) => void;
};

export default function NotificacionesDropdown({ visible, notificaciones, onClose }: NotificacionesDropdownProps) {
    return (
        <DropdownContainer $isVisible={visible}>
            {notificaciones.length > 0 ? (
                notificaciones.map((notificación) => (
                    <NotificaciónContainer key={notificación.id}>
                        <Message>{notificación.message}</Message>
                        <CloseButton onClick={() => onClose(notificación.id)}>X</CloseButton>
                    </NotificaciónContainer>
                ))
            ) : (
                <NotificaciónContainer>
                    <Message>No hay notificaciones</Message>
                </NotificaciónContainer>
            )}
        </DropdownContainer>
    );
}