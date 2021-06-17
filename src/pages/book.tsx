import { Formik } from 'formik';
import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { mutate } from 'swr';
import { Container } from '../components/layout/container';
import { deleteComment, postComment } from '../hooks/mutations/use-comment-mutation';
import { useBookQuery } from '../hooks/queries/use-books-query';
import { useCommentsQuery } from '../hooks/queries/use-comments-query';
import { API_WP } from '../util/constants';
import { useUserContext } from '../util/user-context';

type CommentFormErrors = {
  message?: string;
};

export const Book: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, mutate: mutateBook } = useBookQuery([id]);
  const book = books && books[0];
  const { comments, mutate: mutateComments } = useCommentsQuery(book && book.ID);
  const user = useUserContext();

  return (
    <Container>
      {book && (
        <Fragment>
          <h2>{book.post_title}</h2>
          {comments &&
            comments.map((comment) => (
              /* TODO: implement comment pagination */
              <div key={comment.id}>
                <strong>{comment.author_name}</strong>
                <br />
                <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                {user.id === comment.author && (
                  <button
                    onClick={() => {
                      /* TODO: ask before deletion */
                      deleteComment(comment.id);
                      mutateComments({ comments });
                    }}
                  >
                    delete comment
                  </button>
                )}
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

                  if (res.data) {
                    const newComment = res.data;
                    mutateComments({ ...comments, newComment });
                  }

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
