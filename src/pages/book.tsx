import { Formik } from 'formik';
import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { mutate } from 'swr';
import { Column } from '../components/layout/column';
import { Container } from '../components/layout/container';
import { Row } from '../components/layout/row';
import { deleteComment, postComment } from '../hooks/mutations/use-comment-mutation';
import { useBookQuery } from '../hooks/queries/use-books-query';
import { useCommentsQuery } from '../hooks/queries/use-comments-query';
import { API_WP } from '../util/constants';
import { useUserContext } from '../util/user-context';
import { Comments } from '../components/book-detail/comments';

export const Book: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, mutate: mutateBook } = useBookQuery([id]);
  const book = books && books[0];
  const user = useUserContext();

  return (
    <Container>
      {book && (
        <Fragment>
          <Row>
            <Column width={25}>
              {book.featured_image_url ? (
                <img src={book.featured_image_url} alt={book.post_title + ' Cover'} />
              ) : (
                'No image found.'
              )}
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
