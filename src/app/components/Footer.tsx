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
    margin-top: 20px;
    background-color: ${colors.tertiary};
    color: ${colors.secondary};
    width: 100%;
`;

const FooterText = styled.p`
    margin: 0;
`;

const FooterLink = styled.div`
    color: ${colors.secondary};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const FooterLinks = styled.div`
    display: flex;
    gap: 20px;
`;

const SocialLink = styled.div`
    color: ${colors.secondary};
    font-size: 24px;

    &:hover {
        color: ${colors.primary};
    }
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 15px;
`;

export default function Footer() {
    return (
        <FooterContainer>
            <FooterText>Undersounds 2025</FooterText>
            <FooterLinks>
                <FooterLink>
                    <Link href="/about" passHref>
                        Sobre nosotros
                    </Link>
                </FooterLink>
                <FooterLink>
                    <Link href="/contact" passHref>
                        Contacto
                    </Link>
                </FooterLink>
                <FooterLink>
                    <Link href="/privacy" passHref>
                        Política de privacidad
                    </Link>
                </FooterLink>
            </FooterLinks>
            <SocialLinks>
                <SocialLink>
                    <Link href="https://www.facebook.com" >
                        <FacebookIcon />
                    </Link>
                </SocialLink>
                <SocialLink>
                    <Link href="https://www.twitter.com" >
                        <TwitterIcon />
                    </Link>
                </SocialLink>
                <SocialLink>
                    <Link href="https://www.instagram.com" >
                        <InstagramIcon />
                    </Link>
                </SocialLink>
            </SocialLinks>
        </FooterContainer>
    );
}