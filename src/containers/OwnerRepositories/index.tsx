import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Error } from '@styled-icons/boxicons-regular/Error';
import { Loader } from '../../components/Loader';
import { OwnerRepositoryQuery } from './Respository.graphql';
import { OwnerRepositoriesType, OwnerRepositoryQueryArgument } from './__types__/RepositoryQuery';
import { SearchBar } from '../../components/SearchBar';
import { RepositoryTile } from '../../components/RepositoryTile';
import { RepositoryDetails } from '../RepositoryDetails';

interface MatchParams {
  project: string;
}

interface RepositoryProps extends Partial<RouteComponentProps<MatchParams>> {}

const RepositoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  align-items: center;
  padding: 1rem;
`;

const RepositoryGrid = styled.div`
  display: flex;
  margin-top: 1rem;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  box-shadow: 2px 2px 2px lightgray;
`;

const StyledRow = styled(Row)`
  border-bottom: 1px solid #d3d3d3;
`;

const StyledCol = styled(Col)`
  padding: 0.75rem;
  font-size: 1rem;
`;
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0.75rem;
  font-size: 1rem;
  color: #ff0000;
`;
const StyledError = styled(Error)`
  width: 1rem;
  height: 1rem;
  color: #ff0000;
`;

const Message = styled.div`
  padding: 1rem;
  display: block;
  font-size: 1rem;
`;

const RepositoryName = styled.a`
  margin-left: 0.5rem;
  color: #055c9d;
`;

export const OwnerRepositories: FC<RepositoryProps> = ({ match, history }) => {
  const [owner, setOwner] = useState<string>(match?.params.project || '');
  const [getOwnerRepositories, { loading, error, data }] = useLazyQuery<
    OwnerRepositoriesType,
    OwnerRepositoryQueryArgument
  >(OwnerRepositoryQuery);

  useEffect(() => {
    if (owner) {
      getOwnerRepositories({
        variables: { owner: owner },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const repositories = data?.organization?.repositories?.edges || null;
  const organization = data?.organization;

  const handleRepositorySearch = (repoOwner: string) => {
    history?.push(`/${repoOwner}`);
    setOwner(repoOwner);

    getOwnerRepositories({
      variables: { owner: repoOwner },
    });
  };

  return (
    <RepositoryContainer data-testid="repository-container">
      {<SearchBar onSearch={handleRepositorySearch} />}
      {loading && <Loader />}
      {error && (
        <ErrorContainer>
          <StyledError />
          {`Unable to get repositories for owner ${owner}`}
        </ErrorContainer>
      )}
      {organization && (
        <RepositoryTile
          imageUrl={organization.avatarUrl}
          title={organization.name}
          description={organization.description}
          location={organization.location}
        />
      )}
      {repositories && (
        <RepositoryGrid>
          <Grid>
            {repositories.map((repo, index) => {
              const details = repo?.node;
              if (!details) {
                return <Message>No details were found</Message>;
              }
              const { id, name, forkCount, description, url, stargazers } = details;
              return (
                <StyledRow key={index}>
                  <StyledCol key={id} xs={2}>
                    {url && <RepositoryName href={url}>{name}</RepositoryName>}
                    {!url && <div>{name}</div>}
                  </StyledCol>
                  <StyledCol key={`${id}-desc`} lg>
                    <RepositoryDetails
                      key={id}
                      description={description}
                      name={name || ''}
                      owner={owner}
                      forkCount={forkCount}
                      stargazers={stargazers?.totalCount}
                    />
                  </StyledCol>
                </StyledRow>
              );
            })}
          </Grid>
        </RepositoryGrid>
      )}
      {!repositories && !loading && !error && <Message>{`No repositories yet.`}</Message>}
    </RepositoryContainer>
  );
};
