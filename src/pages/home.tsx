import { FC, Fragment, useState } from 'react';
import { BookList } from '../components/book-list/book-list';
import { useBookQuery } from '../hooks/queries/use-books-query';

export const Home: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const data = useBookQuery(undefined, currentPage, selectedGenres);

  return (
    <Fragment>
      <BookList
        data={data}
        onPaginate={(e) => {
          setCurrentPage(parseInt((e.target as HTMLElement).innerHTML));
        }}
        currentPage={currentPage}
        selectedGenres={selectedGenres}
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
    </Fragment>
  );
};
