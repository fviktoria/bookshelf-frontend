import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { addBook } from '../../hooks/mutations/add-book';
import { Book } from '../../util/types/book';
import { WPQueryPost } from '../../util/types/wp-query-post';
import { useUserContext } from '../../util/user-context';
import { Column } from '../layout/column';
import { Container } from '../layout/container';
import { Row } from '../layout/row';
import { BookCover } from '../ui/book-cover';
import { Button } from '../ui/button';

type BookListItemProps = {
  book: WPQueryPost<Book>;
};

export const BookListItem: FC<BookListItemProps> = ({ book }) => {
  //const { image } = useImageQuery(book.featured_media);
  const history = useHistory();
  const { user } = useUserContext();

  return (
    <StyledBookListItem
      onClick={() => {
        history.push('book/' + book.ID);
      }}
    >
      <Container wide>
        <Row>
          <Column width={30}>
            <BookCover src={book.featured_image_url} />
          </Column>
          <Column width={100}>
            <div>
              <StyledBookListItemTitle>{book.post_title}</StyledBookListItemTitle>
              {book.acf.authors && book.acf.authors.map((author) => author.post_title)}
              {book.acf.description && <p>{book.acf.description.substring(0, 250) + '...'}</p>}

              {user && !user.acf.books.includes(book.ID) && (
                <Button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const res = await addBook(user.id, book.ID);
                  }}
                >
                  Add to bookshelf
                </Button>
              )}
            </div>
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
  margin-bottom: 0.8em;

  &:hover {
    cursor: pointer;
  }
`;

const StyledBookListItemTitle = styled.h3`
  margin: 0;
`;
