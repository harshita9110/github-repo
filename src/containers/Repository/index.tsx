import React, { FC, useState } from 'react';
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

const RepositoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  height: 100vh;
  align-items: center;
  padding: 1rem;
`;

const RepositoryGrid = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const StyledCol = styled(Col)`
  border: 1px solid #5a5a5a;
  padding: 0.75rem;
  font-size: 1rem;
`;
const ErrorContainer = styled.div`
  display: block;
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

export const Repository: FC = () => {
  const [owner, setOwner] = useState<string>('');
  const [getOwnerRepositories, { loading, error, data }] = useLazyQuery<
    OwnerRepositoriesType,
    OwnerRepositoryQueryArgument
  >(OwnerRepositoryQuery);

  const repositories = data?.organization?.repositories?.edges || null;

  const handleRepositorySearch = (repoOwner: string) => {
    setOwner(repoOwner);
    getOwnerRepositories({
      variables: { owner: repoOwner },
    });
  };

  return (
    <RepositoryContainer data-testid="repository-container">
      <SearchBar onSearch={handleRepositorySearch} />
      {loading && <Loader />}
      {error && (
        <ErrorContainer>
          <StyledError />
          {`Unable to get repositories for owner ${owner}`}
        </ErrorContainer>
      )}
      {repositories && (
        <RepositoryGrid>
          <Grid>
            {repositories.map((repo, index) => {
              const details = repo?.node;
              if (!details) {
                return <div />;
              }
              const { id, name, openGraphImageUrl, forkCount, description, url } = details;
              return (
                <Row key={index}>
                  <StyledCol key={id} xs={2}>
                    <RepositoryTile title={name} imageUrl={openGraphImageUrl} url={url} />
                  </StyledCol>
                  <StyledCol key={`${id}-desc`} lg>
                    <RepositoryDetails
                      key={id}
                      description={description}
                      name={name || ''}
                      owner={owner}
                      forkCount={forkCount}
                    />
                  </StyledCol>
                </Row>
              );
            })}
          </Grid>
        </RepositoryGrid>
      )}
      {!repositories && !loading && !error && <Message>{`No repositories yet.`}</Message>}
    </RepositoryContainer>
  );
};
