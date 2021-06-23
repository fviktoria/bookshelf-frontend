import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBookQuery } from '../../hooks/queries/use-books-query';
import { useGenreQuery } from '../../hooks/queries/use-genre-query';
import { useUserContext } from '../../util/user-context';
import { Column } from '../layout/column';
import { Container } from '../layout/container';
import { Row } from '../layout/row';
import { Pagination } from '../pagination/pagination';
import { BookFilters } from './book-filters';
import { BookListItem } from './book-list-item';
import { BookOrdering } from './book-ordering';

type BookListProps = {
  showAll?: boolean;
};

export const BookList: FC<BookListProps> = ({ showAll = false }) => {
  // state
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState('0');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');

  // context
  const { user } = useUserContext();
  console.log(user);

  // queries
  const { books, isLoading, headers } = useBookQuery(
    showAll ? undefined : (user && user.acf?.books && user.acf?.books.length > 0 && user.acf?.books) || [-1],
    currentPage,
    selectedGenres,
    orderBy,
    order,
  );
  const { genres } = useGenreQuery();

  useEffect(() => {
    headers && setTotalPages(headers['x-wp-totalpages']);
  }, [headers]);

  return (
    <Container wide>
      <Row>
        <Column width={30}>
          <StyledSidebar>
            <strong>Filters</strong>
            {genres && (
              <BookFilters
                filters={genres}
                onFilter={(e) => {
                  const selectedValue = (e.target as HTMLInputElement).value;
                  const isSelected = selectedGenres.indexOf(parseInt(selectedValue));
                  if (isSelected !== -1) {
                    setSelectedGenres((prevState) => prevState.filter((item) => item !== parseInt(selectedValue)));
                  } else {
                    setSelectedGenres((prevState) => [...prevState, parseInt(selectedValue)]);
                  }
                }}
              />
            )}
            <br />
            <strong>Order</strong>
            <BookOrdering
              onOrder={(e) => {
                const name = (e.target as HTMLInputElement).name;
                const value = (e.target as HTMLInputElement).value;
                if (name === 'orderBy') {
                  setOrderBy(value);
                } else if (name === 'order') {
                  setOrder(value);
                }
              }}
            />
          </StyledSidebar>
        </Column>
        <Column width={70}>
          {!isLoading && books && books.length > 0 ? (
            books.map((book) => <BookListItem book={book} key={book.ID} />)
          ) : (
            <div>You have no books in your bookshelf</div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={parseInt(totalPages)}
            onClickItem={(e) => setCurrentPage(parseInt((e.target as HTMLElement).innerHTML))}
          />
        </Column>
      </Row>
    </Container>
  );
};

const StyledSidebar = styled.div`
  padding: 1em;
  margin: 0;
  background-color: #f0f0f0;
  border-radius: 1em;
`;
