import { FC } from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  return (
    <StyledBookListItem
      onClick={() => {
        history.push('book/' + book.ID);
      }}
    >
      <Container wide>
        <Row>
          <Column width={30}>
            {book.featured_image_url ? (
              <StyledBookThumbnail src={book.featured_image_url} alt={book.post_title} />
            ) : (
              'No image found.'
            )}
          </Column>
          <Column width={100}>
            <StyledBookListItemDescription>
              <StyledBookListItemTitle>{book.post_title}</StyledBookListItemTitle>
              {book.acf.authors && book.acf.authors.map((author) => author.post_title)}
              {book.acf.description && <p>{book.acf.description.substring(0, 250) + '...'}</p>}
            </StyledBookListItemDescription>
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

  &:hover {
    cursor: pointer;
  }
`;

const StyledBookListItemDescription = styled.div`
  padding-left: 1em;
`;

const StyledBookListItemTitle = styled.h3`
  margin: 0;
`;

const StyledBookThumbnail = styled.img`
  width: 100%;
  display: block;
  border-radius: 1em;
`;
