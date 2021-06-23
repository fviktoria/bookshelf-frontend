import { FC, useEffect, useState } from 'react';
import { useBookQuery } from '../../hooks/queries/use-books-query';
import { useGenreQuery } from '../../hooks/queries/use-genre-query';
import { useUserContext } from '../../util/user-context';
import { Column } from '../layout/column';
import { Container } from '../layout/container';
import { Row } from '../layout/row';
import { Pagination } from '../pagination/pagination';
import { BookFilters } from './book-filters';
import { BookListItem } from './book-list-item';

type BookListProps = {
  showAll?: boolean;
};

export const BookList: FC<BookListProps> = ({ showAll = false }) => {
  // state
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState('0');

  // context
  const user = useUserContext();

  // queries
  const { books, isLoading, headers } = useBookQuery(
    showAll ? undefined : user && user.acf?.books,
    currentPage,
    selectedGenres,
  );
  const { genres } = useGenreQuery();

  useEffect(() => {
    headers && setTotalPages(headers['x-wp-totalpages']);
  }, [headers]);

  return (
    <Container wide>
      <Row>
        <Column width={30}>
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
        </Column>
        <Column width={70}>
          {!isLoading && books.map((book) => <BookListItem book={book} key={book.ID} />)}
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
