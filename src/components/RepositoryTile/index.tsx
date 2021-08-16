import React, { FC } from 'react';
import styled from 'styled-components';

export type RepositoryTileProps = {
  title: string | null | undefined;
  imageUrl: string | null | undefined;
  url: string | null | undefined;
};
const RepositoryTileComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #536676;
`;

const RepositoryPoster = styled.img`
  width: 1rem;
  height: 1rem;
`;

const RepositoryTitle = styled.a`
  margin-left: 0.5rem;
`;

export const RepositoryTile: FC<RepositoryTileProps> = ({ title, imageUrl, url }) => {
  return (
    <RepositoryTileComponent>
      {imageUrl && (
        <RepositoryPoster
          data-testid="repository_image"
          src={`${imageUrl}`}
          alt="No poster found"
        />
      )}
      {url && <RepositoryTitle href={url}>{title}</RepositoryTitle>}
      {!url && <div>{title}</div>}
    </RepositoryTileComponent>
  );
};
