import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes` 
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid gray;
  border-top-color: white;
  animation: ${spin} 0.5s infinite linear;
  margin-top: 1rem;
`;

export const Loader = () => <LoaderContainer data-testid="loader" />;
