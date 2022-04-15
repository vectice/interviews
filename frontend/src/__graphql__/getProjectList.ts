import { gql } from "@apollo/client";

export const GET_PROJECT_LIST = gql`
  query getProjectList(
    $workspaceIdList: [Float!]!
    $search: String
    $pageIndex: Int!
    $pageSize: Int!
    $order: ListOrderInput
  ) {
    getProjectList(
      workspaceIdList: $workspaceIdList
      filters: { search: $search }
      page: { size: $pageSize, index: $pageIndex }
      order: $order
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
