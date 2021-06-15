import { FC } from 'react';
import styled from 'styled-components';
import { useImageQuery } from '../../hooks/queries/use-image-query';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';
import { WPQueryPost } from '../../util/types/wp-query-post';
import { Column } from '../layout/column';
import { Container } from '../layout/container';
import { Row } from '../layout/row';

type BookListItemProps = {
  book: WPQueryPost<Book>;
};

export const BookListItem: FC<BookListItemProps> = ({ book }) => {
  //const { image } = useImageQuery(book.featured_media);

  return (
    <StyledBookListItem>
      <Container wide>
        <Row>
          <Column width={30}>
            {book.featured_image_url ? (
              <StyledBookThumbnail src={book.featured_image_url} alt={book.post_title} />
            ) : (
              'No image found.'
            )}
          </Column>
          <Column>
            <StyledBookListItemTitle>{book.post_title}</StyledBookListItemTitle>
          </Column>
        </Row>
      </Container>
    </StyledBookListItem>
  );
};

const StyledBookListItem = styled.div`
  padding: 1em 0;
  border-radius: 1em;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 0.5em 0;
`;

const StyledBookListItemTitle = styled.h3``;

const StyledBookThumbnail = styled.img`
  width: 100%;
`;
