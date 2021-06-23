import React, { FC } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../util/theme';

type ButtonProps = {
  title?: string;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  variant?: 'default' | 'none';
};

export const Button: FC<ButtonProps> = ({
  type = 'button',
  title,
  onClick,
  disabled,
  children,
  variant = 'default',
}) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} title={title} variant={variant}>
      {children ? children : title}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  border: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-size: 0.8em;
  transition: all 0.2s;
  ${({ variant }) => (variant === 'default' ? VARIANTS.DEFAULT : '')}

  &:hover {
    cursor: pointer;
    background-color: transparent;
  }

  &[disabled] {
    opacity: 0.5;
  }
`;

const VARIANTS = {
  DEFAULT: `
  border: 2px solid ${COLORS.PRIMARY};
  border-radius: 2em;
  padding: 0.7em 1em;
  background-color: ${COLORS.PRIMARY};
  font-size: 1em;
  `,
};
