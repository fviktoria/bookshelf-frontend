import { FC } from 'react';
import styled from 'styled-components';
import { useImageQuery } from '../../hooks/queries/use-image-query';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';
import { UserContext, useUserContext } from '../../util/user-context';
import { Column } from '../layout/column';
import { Container } from '../layout/container';
import { Row } from '../layout/row';

type BookListItemProps = {
  book: Post<Book>;
};

export const BookListItem: FC<BookListItemProps> = ({ book }) => {
  console.log('booklistitem', book);
  const { image } = useImageQuery(book.featured_media);
  console.log(image);
  console.log('usercontext', useUserContext());

  return (
    <StyledBookListItem>
      <Container wide>
        <Row>
          <Column width={30}>
            {image ? <StyledBookThumbnail src={image.source_url} alt={image.alt_text} /> : 'No image found.'}
          </Column>
          <Column>
            <StyledBookListItemTitle>{book.title.rendered}</StyledBookListItemTitle>
          </Column>
        </Row>
      </Container>
    </StyledBookListItem>
  );
};

const StyledBookListItem = styled.div`
  padding: 1em;
  border-radius: 1em;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 0.5em 0;
`;

const StyledBookListItemTitle = styled.h3``;

const StyledBookThumbnail = styled.img`
  width: 100%;
`;
