import { faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { FC, Fragment } from 'react';
import styled from 'styled-components';
import { mutate } from 'swr';
import { deleteComment, postComment } from '../../hooks/mutations/use-comment-mutation';
import { useCommentsQuery } from '../../hooks/queries/use-comments-query';
import { API_WP } from '../../util/constants';
import { Book } from '../../util/types/book';
import { WPQueryPost } from '../../util/types/wp-query-post';
import { useUserContext } from '../../util/user-context';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type CommentsProps = {
  book: WPQueryPost<Book>;
};

type CommentFormErrors = {
  message?: string;
};

export const Comments: FC<CommentsProps> = ({ book }) => {
  const user = useUserContext();
  const { comments, mutate: mutateComments } = useCommentsQuery(book.ID);

  return (
    <Fragment>
      <h3>Comments</h3>
      <StyledCommentsArea>
        {comments && comments.length > 0 ? (
          <StyledCommentsList>
            {comments.map((comment) => (
              /* TODO: implement comment pagination */
              <StyledComment key={comment.id}>
                <strong>{comment.author_name}</strong>
                <br />
                <div dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
                {user && user.id === comment.author && (
                  <Button
                    variant="none"
                    onClick={() => {
                      if (window.confirm('Are you sure you wanna delete your comment?')) {
                        deleteComment(comment.id);
                        mutateComments(comments.splice(comments.indexOf(comment), 1));
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> delete comment
                  </Button>
                )}
              </StyledComment>
            ))}
          </StyledCommentsList>
        ) : (
          <StyledNoCommentsMessage>No comments yet.</StyledNoCommentsMessage>
        )}

        {user !== undefined && book.comment_status === 'open' ? (
          <Formik
            initialValues={{ message: '' }}
            validate={(values) => {
              const errors: CommentFormErrors = {};
              if (!values.message) {
                errors.message = 'Required';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setFieldValue, setFieldTouched }) => {
              try {
                const res = await mutate(API_WP + '/comments', postComment(user.id || 0, values.message, book.ID));

                if (res.data) {
                  const newComment = res.data;
                  mutateComments({ ...comments, newComment });
                  setFieldValue('message', '');
                  setFieldTouched('message', false);
                }

                return res;
              } catch (error) {
                console.log('comment mutation error: ', error);
              }

              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  type="textarea"
                  label="Comment content"
                  name="message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                />
                {errors.message && touched.message && errors.message}

                <br />
                <Button title="Post comment" type="submit" disabled={isSubmitting} />
              </form>
            )}
          </Formik>
        ) : book.comment_status === 'open' ? (
          'Log in to post a comment.'
        ) : (
          'Comments are not allowed for this page.'
        )}
      </StyledCommentsArea>
    </Fragment>
  );
};

const StyledCommentsArea = styled.div`
  border-radius: 1em;
  background-color: #f0f0f0;
  padding: 1em;
  margin-bottom: 2em;
`;

const StyledCommentsList = styled.div`
  margin-bottom: 1em;
`;

const StyledComment = styled.div`
  border-bottom: 1px solid #dedede;
  padding: 1em;
`;

const StyledNoCommentsMessage = styled.div`
  font-weight: 700;
  font-size: 1.2em;
  text-align: center;
  padding: 1em;
`;
