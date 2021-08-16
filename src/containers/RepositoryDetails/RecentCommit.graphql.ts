import { gql } from "@apollo/client";

export const RecentCommitsQuery = gql`
    query RecentCommitsQuery ($owner:String!, $name:String!){
        repository(owner: $owner, name:$name) {
            ref(qualifiedName: "master") {
                target {
                  ... on Commit {
                    id
                    history(first: 5) {
                      edges {
                        node {
                          id
                          commitUrl
                          messageHeadline
                          message
                          author {
                            name
                            email
                            date
                          }
                        }
                      }
                    }
                  }
                }
              }
        }
    }
`