import React, { FC } from 'react';
import styled from 'styled-components';

export type RepositoryTileProps = {
  title: string | null | undefined;
  description: string | null | undefined;
  imageUrl: string | null | undefined;
  location: string | null | undefined;
};
const RepositoryTileComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 1rem;
  color: #536676;
  word-break: break-all;
  padding: 0.5rem;
  margin: 0;
`;

const RepositoryPoster = styled.img`
  width: 5rem;
  height: 5rem;
`;

const RepositoryTitle = styled.h2`
  margin: 0;
  padding-bottom: 0.25rem;
`;

const RepositoryCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 0.25rem;
  align-items: flex-start;
`;

const RepositoryDescription = styled.p`
  font-style: italic;
  margin: 0;
  padding: 0;
`;

const RepositoryLocation = styled.p`
  margin-top: 0.5rem;
  padding: 0;
`;

export const RepositoryTile: FC<RepositoryTileProps> = ({
  title,
  location,
  description,
  imageUrl,
}) => {
  return (
    <RepositoryTileComponent>
      {imageUrl && (
        <RepositoryPoster
          data-testid="repository_image"
          src={`${imageUrl}`}
          alt="No poster found"
        />
      )}
      <RepositoryCol>
        <RepositoryTitle>{title}</RepositoryTitle>
        <RepositoryDescription>{description}</RepositoryDescription>
        <RepositoryLocation>Location: {location}</RepositoryLocation>
      </RepositoryCol>
    </RepositoryTileComponent>
  );
};
