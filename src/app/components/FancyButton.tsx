'use client'
import React from "react";
import styled from "styled-components";
import colors from "../colors";

interface CategoryButtonProps {
  title: string;
  imageSrc: string;
  bgColor: string;
  onClick?: () => void;
}

const Button = styled.button`
    background-color: ${props => props.color || 'white'};
  width: 160px;
  height: 180px;
  border-radius: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 15px;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const Title = styled.span`
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.tertiary};
  z-index: 2;
`;

const Image = styled.img`
  width: 150px;
  height: auto;
  object-fit: cover;
  position: absolute;
  bottom: -20px;
  right: -30px;
  mix-blend-mode: multiply;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CategoryButton: React.FC<CategoryButtonProps> = ({ title, imageSrc, bgColor, onClick }) => {
  return (
    <Button onClick={onClick} color={bgColor}>
        <Title>{title}</Title>
        <Image src={imageSrc} alt={title} />
    </Button>
  );
};

export default CategoryButton;