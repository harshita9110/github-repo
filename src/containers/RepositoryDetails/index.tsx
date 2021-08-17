import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { RightArrow } from '@styled-icons/boxicons-regular/RightArrow';
import { DownArrow } from '@styled-icons/boxicons-regular/DownArrow';
import { GitRepoForked } from '@styled-icons/boxicons-regular/GitRepoForked';
import { Star } from '@styled-icons/boxicons-regular/Star';
import { Error } from '@styled-icons/boxicons-regular/Error';
import { RecentCommitsQuery } from './RecentCommits.graphql';
import { RecentCommitsType, RecentCommitsArguments } from './__types__/RecentCommits';
import { Loader } from '../../components/Loader';

export type RepositoryDetailsProps = {
  owner: string;
  name: string;
  description: string | null | undefined;
  forkCount: number | null | undefined;
  stargazers: number | null | undefined;
};

const RepositoryDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
`;

const CommitContainer = styled.div`
  font-size: 1rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.25rem;
  align-items: center;
  word-wrap: break-word;
  padding: 0.5rem;
`;

const RightArrowIcon = styled(RightArrow)`
  width: 1rem;
  height: 1rem;
  color: #727272;
  cursor: pointer;
`;

const DownArrowIcon = styled(DownArrow)`
  width: 1rem;
  height: 1rem;
  color: #727272;
  cursor: pointer;
`;

const ForkIcon = styled(GitRepoForked)`
  width: 1rem;
  height: 1rem;
  color: #00a300;
`;

const StarIcon = styled(Star)`
  width: 1rem;
  height: 1rem;
  color: #0e86d4;
`;

const StyledError = styled(Error)`
  width: 0.75rem;
  height: 0.75rem;
  color: #ff0000;
`;

const StyledCol = styled.td`
  display: table-cell;
  padding: 0.75rem;
  word-wrap: break-word;
`;

const StyledRow = styled.tr`
  display: table-row;
  border 1px solid #D3D3D3;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0.75rem;
  font-size: 1rem;
  color: #ff0000;
`;

const CommitsGrid = styled.table`
  display: table;
  border: 1px solid #d3d3d3;
  border-collapse: collapse;
  width: 100%;
`;

const StyledAnchor = styled.a`
  color: #055c9d;
`;

export const RepositoryDetails: FC<RepositoryDetailsProps> = ({
  owner,
  name,
  description,
  forkCount,
  stargazers,
}) => {
  const [commitsExpanded, setCommitsExpanded] = useState<boolean>(false);
  const [getRepositoryCommits, { loading, error, data }] = useLazyQuery<
    RecentCommitsType,
    RecentCommitsArguments
  >(RecentCommitsQuery);

  const toggleCommitsExpanded = () => {
    const newCommitsExpanded = !commitsExpanded;
    setCommitsExpanded(newCommitsExpanded);
    if (newCommitsExpanded) {
      getRepositoryCommits({
        variables: {
          owner,
          name,
        },
      });
    }
  };

  const commits = data?.repository?.ref?.target?.history?.edges;

  return (
    <RepositoryDetailsContainer data-testid="repository_details">
      <Detail style={{ fontStyle: 'italic' }}>{description || 'No description'}</Detail>
      <Detail>
        <ForkIcon />
        Fork Count: {forkCount || 0}
      </Detail>
      <Detail>
        <StarIcon />
        StarGazers: {stargazers || 0}
      </Detail>
      <Detail style={{ cursor: 'pointer' }} onClick={toggleCommitsExpanded} data-testid="commits">
        {commitsExpanded ? <DownArrowIcon /> : <RightArrowIcon />}Commits
      </Detail>
      {loading && <Loader />}
      {error && (
        <ErrorContainer>
          <StyledError />
          Unable to get commit details
        </ErrorContainer>
      )}
      {commitsExpanded && commits && (
        <CommitContainer>
          {!loading && !error && (
            <CommitsGrid>
              {commits.map((commit, index) => {
                const details = commit?.node;
                if (!details) {
                  return <Detail>No details were found</Detail>;
                }
                const { id, author, commitUrl, message } = details;
                return (
                  <tbody key={index}>
                    <StyledRow key={index}>
                      <StyledCol key={id}>
                        {commitUrl && <StyledAnchor href={commitUrl}>{message}</StyledAnchor>}
                        {!commitUrl && 'No commit found'}
                      </StyledCol>
                      <StyledCol key={`${id}-desc`}>
                        Author: {author?.email || author?.name || 'No Auther found'}
                      </StyledCol>
                    </StyledRow>
                  </tbody>
                );
              })}
            </CommitsGrid>
          )}
          {!commits && !loading && !error && <Detail>No commits found</Detail>}
        </CommitContainer>
      )}
    </RepositoryDetailsContainer>
  );
};
