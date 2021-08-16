import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, cleanup, fireEvent, act, waitFor } from '@testing-library/react';
import { OwnerRepositoryQuery } from '../Respository.graphql';
import { Repository } from '../index';
afterEach(cleanup);

describe('Repository', () => {
  const mock = [
    {
      request: {
        query: OwnerRepositoryQuery,
        variables: {
          owner: 'netflix',
        },
      },
      result: {
        data: {
          organization: {
            repositories: {
              edges: [
                {
                  node: {
                    name: 'test1',
                    url: 'https://github.com/test1',
                    forkCount: 362,
                    description: 'test desc 1',
                    openGraphImageUrl: 'test',
                    id: 'MDEwOlJlcG9zaXRvcnkyMDQ0MDI5',
                  },
                },
                {
                  node: {
                    name: 'test2',
                    url: 'https://github.com/test2',
                    forkCount: 441,
                    description: 'test desc 2',
                    openGraphImageUrl: 'test',
                    id: 'MDEwOlJlcG9zaXRvcnkyMDQ5Mzc5',
                  },
                },
              ],
            },
          },
        },
      },
    },
  ];
  test('should render repository component correctly', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={mock}>
        <Repository />
      </MockedProvider>
    );
    expect(getByTestId('repository-container')).toBeVisible();
    fireEvent.change(getByTestId('search_input'), { target: { value: 'netflix' } });
    act(() => {
      fireEvent.click(getByTestId('search_button'));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(getByText('test1')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText('test2')).toBeInTheDocument();
    });
  });

  test('should render loading state correctly', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mock}>
        <Repository />
      </MockedProvider>
    );
    expect(getByTestId('repository-container')).toBeVisible();
    fireEvent.change(getByTestId('search_input'), { target: { value: 'netflix' } });
    act(() => {
      fireEvent.click(getByTestId('search_button'));
    });

    await waitFor(() => {
      expect(getByTestId('loader')).toBeInTheDocument();
    });
  });

  test('should render error state correctly', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: OwnerRepositoryQuery,
              variables: {
                owner: 'netflix',
              },
            },
            error: new Error('An error occurred'),
          },
        ]}
      >
        <Repository />
      </MockedProvider>
    );
    expect(getByTestId('repository-container')).toBeVisible();
    fireEvent.change(getByTestId('search_input'), { target: { value: 'netflix' } });
    act(() => {
      fireEvent.click(getByTestId('search_button'));
    });

    await waitFor(() => {
      expect(getByText('Unable to get repositories for owner netflix')).toBeInTheDocument();
    });
  });
});
