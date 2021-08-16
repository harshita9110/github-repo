import { gql } from "@apollo/client";

export const OwnerRepositoryQuery  = gql`
    query OwnerRepositoryQuery($owner:String!) {
        organization(login: $owner) {
            repositories(first: 100,orderBy:{direction:DESC, field:STARGAZERS}) {
                edges {
                node {
                    name
                    url
                    forkCount
                    id
                    openGraphImageUrl
                    description
                }
                }
            }
        }
    }
`;