import React, { FC } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../util/theme';

type ButtonProps = {
  title?: string;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({ type = 'button', title, onClick, disabled, children }) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled} title={title}>
      {children ? children : title}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: 2px solid ${COLORS.PRIMARY};
  border-radius: 2em;
  padding: 0.7em 1em;
  background-color: ${COLORS.PRIMARY};
  font-weight: 700;
  font-size: 1em;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: transparent;
  }

  &[disabled] {
    opacity: 0.5;
  }
`;
