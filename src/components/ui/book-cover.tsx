import { FC } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../util/theme';

type BookCoverProps = {
  src?: string;
};

export const BookCover: FC<BookCoverProps> = ({ src }) => {
  return src ? <StyledImage src={src} /> : <StyledPlaceholderImage>No image found.</StyledPlaceholderImage>;
};

const StyledImage = styled.img`
  width: 100%;
  display: block;
  border-radius: 1em;
`;

const StyledPlaceholderImage = styled.div`
  padding: 3em;
  background-color: ${COLORS.GREY.LIGHT};
  border-radius: 1em;
  text-align: center;
`;
