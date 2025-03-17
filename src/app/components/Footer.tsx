'use client';
import React from 'react';
import styled from 'styled-components';
import colors from '../colors';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterContainer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: ${colors.tertiary};
    color: ${colors.secondary};
    position: fixed;
    bottom: 0;
    width: 100%;
`;

const FooterText = styled.p`
    margin: 0;
`;

const FooterLinks = styled.div`
    display: flex;
    gap: 20px;
`;

const FooterLink = styled.a`
    color: ${colors.secondary};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 15px;
`;

const SocialLink = styled.a`
    color: ${colors.secondary};
    font-size: 24px;

    &:hover {
        color: ${colors.primary};
    }
`;

export default function Footer() {
    return (
        <FooterContainer>
            <FooterText>Undersounds</FooterText>
            <FooterLinks>
                <Link href="/about" passHref>
                    <FooterLink >Sobre nosotros</FooterLink>
                </Link>
                <Link href="/contact" passHref>
                    <FooterLink >Contacto</FooterLink>
                </Link>
                <Link href="/privacy" passHref>
                    <FooterLink >Política de privacidad</FooterLink>
                </Link>
            </FooterLinks>
            <SocialLinks>
                <SocialLink href="https://www.facebook.com" >
                    <FacebookIcon />
                </SocialLink>
                <SocialLink href="https://www.twitter.com" >
                    <TwitterIcon />
                </SocialLink>
                <SocialLink href="https://www.instagram.com" >
                    <InstagramIcon />
                </SocialLink>
            </SocialLinks>
        </FooterContainer>
    );
}