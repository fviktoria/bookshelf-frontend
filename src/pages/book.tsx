import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from '../components/layout/column';
import { Container } from '../components/layout/container';
import { Row } from '../components/layout/row';
import { useBookQuery } from '../hooks/queries/use-books-query';
import { Comments } from '../components/book-detail/comments';
import { BookCover } from '../components/ui/book-cover';

export const Book: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books } = useBookQuery([id]);
  const book = books && books[0];

  return (
    <Container>
      {book && (
        <Fragment>
          <Row>
            <Column width={25}>
              <BookCover src={book.featured_image_url} />
            </Column>
            <Column>
              <h2>{book.post_title}</h2>
            </Column>
          </Row>
          <Comments book={book} />
        </Fragment>
      )}
    </Container>
  );
};
