import { useState } from 'react';

import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import { fetchNotes } from '../../services/noteServise';
import NoteForm from '../NoteForm/NoteForm';
import SearchBox from '../SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', searchValue, currentPage],
    queryFn: () => fetchNotes(searchValue, currentPage),
    placeholderData: keepPreviousData,
  });

  const closeModal = () => setIsModalOpen(false);

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value.trim());
      setCurrentPage(1);
    },
    500
  );

  const totalPages = data?.totalPages || 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchValue} onSearch={handleChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Sorry something went wrong, try again later.</p>}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}

export default App;
