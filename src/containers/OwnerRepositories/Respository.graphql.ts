import { gql } from "@apollo/client";

export const OwnerRepositoryQuery  = gql`
    query OwnerRepositoryQuery($owner:String!) {
        organization(login: $owner) {
            name
            location
            description
            avatarUrl
            repositories(first: 100,orderBy:{direction:DESC, field:STARGAZERS}) {
                edges {
                    node {
                        name
                        url
                        forkCount
                        id
                        description
                        stargazers {
                            totalCount
                        }
                    }
                }
            }
        }
    }
`;