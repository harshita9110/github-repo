import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { RepositoryTile } from '../index';
afterEach(cleanup);

describe('RepositoryTile', () => {
  test('should show image if imageUrl is passed', async () => {
    const { getByTestId, getByText } = render(
      <RepositoryTile
        title="netflix"
        imageUrl="test"
        description="test desc"
        location="test location"
      />
    );
    expect(getByTestId('repository_image')).toBeVisible();
    expect(getByText('netflix')).toBeVisible();
    expect(getByText('test desc')).toBeVisible();
  });

  test('should show ti', async () => {
    const { getByText } = render(
      <RepositoryTile
        title="netflix"
        imageUrl={null}
        description="test desc"
        location="test location"
      />
    );
    expect(getByText('netflix')).toBeVisible();
  });
});
