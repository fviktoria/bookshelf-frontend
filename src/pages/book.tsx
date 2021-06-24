import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from '../components/layout/column';
import { Container } from '../components/layout/container';
import { Row } from '../components/layout/row';
import { useBookQuery } from '../hooks/queries/use-books-query';
import { Comments } from '../components/book-detail/comments';
import { BookCover } from '../components/ui/book-cover';
import styled from 'styled-components';

export const Book: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books } = useBookQuery([parseInt(id)]);
  const book = books && books[0];

  return (
    <Container>
      {book && (
        <Fragment>
          <Row>
            <Column colWidth={25}>
              <BookCover src={book.featured_image_url} />
            </Column>
            <Column colWidth={75}>
              <StyledBookTitle>{book.post_title}</StyledBookTitle>
              {book.acf.authors && book.acf.authors.map((author) => author.post_title)}
              {book.acf.description && <p>{book.acf.description}</p>}
            </Column>
          </Row>
          <Comments book={book} />
        </Fragment>
      )}
    </Container>
  );
};

const StyledBookTitle = styled.h2`
  margin: 0;
`;
