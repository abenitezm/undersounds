"use client";

import React, { useState } from "react";
import colors from "../colors";
import { styled } from "styled-components";
import {
  Search,
  Notifications,
  LibraryMusic,
  AccountCircle,
} from "@mui/icons-material";
import Link from "next/link";
import NotificacionesDropdown from "./DesplegableNoti";
import CartIcon from "./CartIcon";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.tertiary};
  padding: 10px 20px;
  width: 100%;
  position: fixed;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.img`
  height: 60px;
  width: auto;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;
`;

const SearchInput = styled.input<{ $isVisible: boolean }>`
  padding: 14px;
  border: none;
  border-radius: 20px;
  color: ${colors.background};
  background: ${colors.secondary};
  outline: none;
  transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;
  width: ${({ $isVisible }) => ($isVisible ? "200px" : "0")};
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};
`;

const NavButton = styled.button`
  color: ${colors.secondary};
  font-size: 28px;
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

const IconButton = styled.div`
  font-size: 46px; /* Tamaño del icono */
  cursor: pointer;
  width: 50px; /* Establecer un tamaño fijo para el contenedor */
  height: 50px; /* Establecer un tamaño fijo para el contenedor */
  border-radius: 50%; /* Hace el fondo completamente circular */
  transition: background-color 0.3s ease;
  display: flex; /* Usar flexbox para alinear el icono */
  align-items: center; /* Centra el icono verticalmente */
  justify-content: center; /* Centra el icono horizontalmente */

  &:hover {
    background-color: ${colors.primary};
  }

  /* Asegura que el icono tenga un tamaño consistente */
  & svg {
    font-size: 36px !important; /* Asegura que todos los iconos tengan el mismo tamaño */
  }
`;

const ButtonBox = styled.div`
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

export default function NavBar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, message: "Has comprado la canción:" },
    { id: 2, message: "Has comprado el álbum:" },
    { id: 3, message: "Has comprado una camiseta" },
  ]);

  const handleToggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCloseNotificación = (id: number) => {
    setNotificaciones(
      notificaciones.filter((notificación) => notificación.id !== id)
    );
  };

    return (
        <Header>
            <LogoContainer>
                <Link href="/">
                    <Logo src="/logo.svg" alt="Logo Undersounds" />
                </Link>
                <SearchContainer>
                    <IconButton>
                        <Search 
                            fontSize="inherit"  
                            onClick={() => setSearchVisible(!searchVisible)} 
                        />
                    </IconButton>
                    <SearchInput 
                        type="text" 
                        placeholder="Buscar..." 
                        $isVisible={searchVisible} 
                    />
                </SearchContainer>
            </LogoContainer>
            <ButtonBox>
                <NavButton>
                    <Link href="/navigation">Explorar</Link>
                </NavButton>
                <NavButton>
                    <Link href="/Vinilos">Vinilos</Link>
                </NavButton>
                <NavButton>
                    <Link href="/CDs">CDs</Link>
                </NavButton>
                <NavButton>
                    <Link href="/Casset">Cassettes</Link>
                </NavButton>
                <Link href="/Tienda">
                    <NavButton>Merch</NavButton>
                </Link>
            </ButtonBox>
            <div style={{ display: 'flex' }}>
                <IconButton>
                    <Notifications fontSize="inherit" onClick={handleToggleDropdown} />
                </IconButton>
                <IconButton>
                    <LibraryMusic fontSize="inherit" />
                </IconButton>
                <IconButton>
                    <Link href="/login">
                        <AccountCircle fontSize="inherit" />
                    </Link>
                </IconButton>
            </div>
            <NotificacionesDropdown
                visible={dropdownVisible}
                notificaciones={notificaciones}
                onClose={handleCloseNotificación}
            />
        </Header>
    );
}
