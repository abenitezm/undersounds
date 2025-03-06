'use client';
import styled from "styled-components";
import colors from "../colors";
import CloseIcon from '@mui/icons-material/Close';

const NotificaciónContainer = styled.div`
    background-color: ${colors.primary};
    color: ${colors.secondary};
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
`;

const CloseButton = styled(CloseIcon)`
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
`;

type NotificaciónProps = {
    message: string;
    onClose: () => void;
};

export default function Notificación({ message, onClose }: NotificaciónProps) {
    return (
        <NotificaciónContainer>
            <p>{message}</p>
            <CloseButton onClick={onClose} />
        </NotificaciónContainer>
    );
}