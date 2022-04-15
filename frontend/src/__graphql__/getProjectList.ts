import { gql } from "@apollo/client";

export const GET_PROJECT_LIST = gql`
  query getProjectList(
    $workspaceIdList: [Float!]!
    $page: PageInput
  ) {
    getProjectList(
      workspaceIdList: $workspaceIdList
      page: $page
    ) {
      items {
        id
        name
        description
        updatedDate
        documentationPages {
          id
          status
        }
      }
      page {
        index
        size
      }
      total
    }
  }
`;
