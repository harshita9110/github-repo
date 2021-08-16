import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, cleanup, fireEvent } from '@testing-library/react';
import { SearchBar } from '../index';
afterEach(cleanup);

describe('SearchBar', () => {
  test('should search correctly', async () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(<SearchBar onSearch={onSearch} />);

    fireEvent.change(getByTestId('Search_input'), { target: { value: 'netflix' } });
    fireEvent.click(getByTestId('Search_button'));
    expect(onSearch).toHaveBeenCalledWith('netflix');
  });
});
