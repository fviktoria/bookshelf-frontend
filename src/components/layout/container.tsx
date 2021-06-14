import { FC } from 'react';
import styled from 'styled-components';

type ContainerProps = {
  wide?: boolean;
};

export const Container: FC<ContainerProps> = ({ wide = false, children }) => {
  console.log('wide?', wide);
  return <StyledContainer wide={wide}>{children}</StyledContainer>;
};

const StyledContainer = styled.div<ContainerProps>`
  max-width: ${({ wide }) => (!wide ? '70vw' : '100vw')};
  margin: 0 auto;
  padding: 0 1em;
`;
