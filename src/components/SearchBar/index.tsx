import React, { FC, useState, KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import styled from 'styled-components';
import { SearchAlt } from '@styled-icons/boxicons-regular/SearchAlt';

export type SearchBarProps = {
  onSearch: (text: string) => void;
};
const SearchBarComponent = styled.div`
  display: flex;
  width:100%
  max-width: 40rem;
  height: 2.1875rem;
  justify-content: space-between;
  border: 0.0625rem solid #ddd;
`;

const SearchInput = styled.input.attrs({ type: 'text' })`
  outline: 'none';
  border: none;
  font-size: 1 rem;
  padding: 0.625rem;
  flex: 1;
  color: #5a5a5a;
`;

const SearchButton = styled.button`
  height: 2.1875rem;
  width: 2.0625rem;
  outline: none;
  background-color: white;
  cursor: pointer;
  box-sizing: border-box;
  appearance: none;
  border: none;
  border-left: 0.0625rem solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled(SearchAlt)`
  width: 1.5rem;
  height: 1.5rem;
  color: #727272;
`;

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);
  };

  const handleSearchEnter = (evt: KeyboardEvent<HTMLInputElement>) => {
    const isEnterPressed: Boolean = evt.key === 'Enter';
    if (isEnterPressed) {
      onSearch(searchText);
    }
  };
  const handleSearchClicked = (evt: MouseEvent) => {
    onSearch(searchText);
  };
  return (
    <SearchBarComponent>
      <SearchInput
        onChange={handleSearchTextChange}
        value={searchText}
        placeholder="Enter repository name ..."
        onKeyPress={handleSearchEnter}
        data-testid="search_input"
      />
      <SearchButton onClick={handleSearchClicked} data-testid="search_button">
        <SearchIcon />
      </SearchButton>
    </SearchBarComponent>
  );
};
