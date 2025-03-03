'use client';

import React from "react";
import colors from "../colors";
import { styled } from "styled-components";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
    return (
        <Header>
            <a href="/">
                <Logo src="./logo.svg" alt="Logo Undersounds" />
            </a>
            <ButtonBox>
                <NavButton>Explorar</NavButton>
                <NavButton>Vinilo</NavButton>
                <NavButton>CDs</NavButton>
                <NavButton>Cassettes</NavButton>
                <NavButton>Camisetas</NavButton>
            </ButtonBox>
            <div>
                <NotificationsIcon fontSize="large"/>
                <LibraryMusicIcon fontSize="large"/>
                <AccountCircleIcon fontSize="large"/>
            </div>
        </Header>
    );
}