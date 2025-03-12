'use client';

import React from "react";
import { useState } from "react";
import colors from "../colors";
import { styled } from "styled-components";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import NotificacionesDropdown from "./DesplegableNoti"; 

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${colors.tertiary};
    padding: 10px 20px;
    width: 100%;
`;

const Logo = styled.img`
    height: 60px;
    width: auto;
`;

const NavButton = styled.button`
    color: ${colors.secondary};
    font-size: 24px;
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 5px;
    position: relative;

    &:after {
        content: "";
        display: block;
        border-radius: 10px;
        height: 3px;
        width: 0;
        background: ${colors.primary};
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        transition: width 0.2s ease-in-out;
    }

    &:hover:after {
        width: 50%;
    }
`;

const ButtonBox = styled.div`
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
`;

export default function NavBar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [notificaciones, setNotificaciones] = useState([
        { id: 1, message: "Has comprado la canción:" },
        { id: 2, message: "Has comprado el álbum:" },
        { id: 3, message: "Has comprado una camiseta" },
    ]);

    const handleToggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleCloseNotificación = (id: number) => {
        setNotificaciones(notificaciones.filter(notificación => notificación.id !== id));
    };
    return (
        <Header>
            <Link href = "/">
                <Logo src="/logo.svg" alt="Logo Undersounds" />
            </Link>
            <ButtonBox>
                <NavButton>
                    <Link href = "/navigation">Explorar</Link>
                </NavButton>
                <NavButton>Vinilo</NavButton>
                <NavButton>CDs</NavButton>
                <NavButton>Cassettes</NavButton>
                <NavButton>Camisetas</NavButton>
            </ButtonBox>
            <div>
                <Link href = "/Tienda">
                    <ShoppingCart fontSize = "large" style = {{cursor: "pointer"}}/>
                </Link>
                <NotificationsIcon fontSize="large" onClick={handleToggleDropdown} style={{ cursor: 'pointer' }}/>
                <LibraryMusicIcon fontSize="large"/>
                <AccountCircleIcon fontSize="large"/>
            </div>
            <NotificacionesDropdown
                visible={dropdownVisible}
                notificaciones={notificaciones}
                onClose={handleCloseNotificación}
            />
        </Header>
    );
}