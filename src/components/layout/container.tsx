import { FC } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  wide?: boolean;
  noPadding?: boolean;
};

export const Container: FC<ContainerProps> = ({ wide = false, noPadding, children }) => {
  return (
    <StyledContainer wide={wide} noPadding={noPadding}>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<ContainerProps>`
  max-width: ${({ wide }) => (!wide ? '70vw' : '100vw')};
  margin: 0 auto;
  padding: ${({ noPadding }) => !noPadding && '0 1em'};
`;
