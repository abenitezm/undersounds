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
    padding: 10px 20px;
    width: 100%;
    position: sticky;
`;

const Logo = styled.img`
    height: 60px;
    width: auto;
`;

export default function NavBar() {
    return (
        <Header>
            <Link href = "/">
                <Logo src="/logo.svg" alt="Logo Undersounds" />
            </Link>
        </Header>
    );
}