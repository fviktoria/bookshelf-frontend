import { Formik } from 'formik';
import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { mutate } from 'swr';
import { Container } from '../components/layout/container';
import { Row } from '../components/layout/row';
import { postComment } from '../hooks/mutations/use-comment-mutation';
import { useBookQuery } from '../hooks/queries/use-books-query';
import { API_BOOKSHELF, API_WP } from '../util/constants';
import { useUserContext } from '../util/user-context';

type CommentFormErrors = {
  message?: string;
};

export const Book: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, mutate: mutateBook } = useBookQuery([id]);
  const book = books && books[0];
  const user = useUserContext();
  const comments = book && book.comments;

  return (
    <Container>
      {book && (
        <Fragment>
          <h2>{book.post_title}</h2>
          {comments &&
            comments.map((comment) => (
              <div key={comment.comment_ID}>
                <strong>{comment.comment_author}</strong>
                <br />
                {comment.comment_content}
              </div>
            ))}
          {user !== undefined && book.comment_status === 'open' && (
            <Formik
              initialValues={{ message: '' }}
              validate={(values) => {
                const errors: CommentFormErrors = {};
                if (!values.message) {
                  errors.message = 'Required';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                console.log(values);

                try {
                  const res = await mutate(API_WP + '/comments', postComment(user.id || 0, values.message, book.ID));
                  comments?.push(res.data);
                  console.log('comments', comments);
                  mutateBook({ ...book, comments });
                  return res;
                } catch (error) {
                  console.log('comment mutation error: ', error);
                }

                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <textarea
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                  ></textarea>
                  {errors.message && touched.message && errors.message}

                  <br />
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          )}
        </Fragment>
      )}
    </Container>
  );
};
