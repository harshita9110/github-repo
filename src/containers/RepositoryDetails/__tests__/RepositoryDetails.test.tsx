import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, cleanup, fireEvent, act, waitFor } from '@testing-library/react';
import { RecentCommitsQuery } from '../RecentCommits.graphql';
import { RepositoryDetails } from '../index';
afterEach(cleanup);
describe('Repository Detaills', () => {
  const mock = [
    {
      request: {
        query: RecentCommitsQuery,
        variables: {
          owner: 'netflix',
          name: 'testrepo',
        },
      },
      result: {
        data: {
          repository: {
            __typename: 'Repository',
            ref: {
              target: {
                __typename: 'Commit',
                id: 'test',
                history: {
                  edges: [
                    {
                      node: {
                        id: 'test',
                        commitUrl: 'https://test.com',
                        messageHeadline: 'test message headline',
                        message: 'test message',
                        author: {
                          name: 'test author',
                          email: 'test@test.com',
                          date: '2021-04-20T17:18:16-07:00',
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  ];

  test('should render repository component correctly', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <MockedProvider mocks={mock}>
        <RepositoryDetails
          description="test"
          name="testrepo"
          owner="netflix"
          forkCount={32}
          stargazers={10}
        />
      </MockedProvider>
    );
    expect(getByTestId('repository_details')).toBeVisible();
    expect(getByText('Commits')).toBeVisible();
    expect(queryByText('test message')).not.toBeInTheDocument();
  });

  test('should render commits when expanded', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <MockedProvider mocks={mock}>
        <RepositoryDetails
          description="test"
          name="testrepo"
          owner="netflix"
          forkCount={32}
          stargazers={10}
        />
      </MockedProvider>
    );
    act(() => {
      fireEvent.click(getByTestId('commits'));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(getByText('test message')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(getByTestId('commits'));
    });
    expect(queryByText('test message')).not.toBeInTheDocument();
  });

  test('should render loading state correctly', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mock}>
        <RepositoryDetails
          description="test"
          name="testrepo"
          owner="netflix"
          forkCount={32}
          stargazers={10}
        />
      </MockedProvider>
    );
    act(() => {
      fireEvent.click(getByTestId('commits'));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
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
              query: RecentCommitsQuery,
              variables: {
                owner: 'netflix',
                name: 'testrepo',
              },
            },
            error: new Error('An error occurred'),
          },
        ]}
      >
        <RepositoryDetails
          description="test"
          name="testrepo"
          owner="netflix"
          forkCount={32}
          stargazers={10}
        />
      </MockedProvider>
    );
    act(() => {
      fireEvent.click(getByTestId('commits'));
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    await waitFor(() => {
      expect(getByText('Unable to get commit details')).toBeInTheDocument();
    });
  });
});
