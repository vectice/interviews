import { MockedResponse } from '@apollo/client/testing';
import { DocumentNode } from 'graphql';

export const getProjectData = () =>
  JSON.parse(
    JSON.stringify({
      getProjectList: {
        items: [
          {
            id: 1142,
            name: 'Update Deployment Secrets',
            description:
              'This document describes the steps to follow in order to add new environment variables to the deployment yaml and to the Kubernetes secrets',
            updatedDate: '2021-10-11T09:54:54.921Z',
            documentationPages: [{ id: 1887, status: 'NotStarted', __typename: 'DocumentationPage' }],
            __typename: 'Project',
          },
          {
            id: 3245,
            name: 'Predicting house prices in King County',
            description:
              'In April last year, King County home prices were up 14.8% compared to last year, selling for a median price of $758K. On average, homes in King County sell after 6 days on the market compared to 6 days last year. There were 3,644 homes sold in April this year, up from 2,153 last year.  ',
            updatedDate: '2021-09-11T09:54:54.921Z',
            documentationPages: [{ id: 1457, status: 'Completed', __typename: 'DocumentationPage' }],
            __typename: 'Project',
          },
          {
            id: 1238,
            name: 'Simple clustering',
            description: 'Cluster Project',
            updatedDate: '2020-10-15T09:54:54.921Z',
            documentationPages: [{ id: 1546, status: 'Draft', __typename: 'DocumentationPage' }],
            __typename: 'Project',
          },
          {
            id: 6542,
            name: 'Sample project',
            description: 'A simple sample project',
            updatedDate: '2021-10-11T09:54:54.921Z',
            documentationPages: [{ id: 1357, status: 'NotStarted', __typename: 'DocumentationPage' }],
            __typename: 'Project',
          },
          {
            id: 6543,
            name: 'Sample project 2',
            description: 'A simple sample project',
            updatedDate: '2021-08-21T09:54:54.921Z',
            documentationPages: [{ id: 453, status: 'NotStarted', __typename: 'DocumentationPage' }],
            __typename: 'Project',
          },
          {
            id: 1142,
            name: 'Sample project 3',
            description: 'A simple sample project',
            updatedDate: '2021-05-29T09:54:54.921Z',
            documentationPages: [{ id: 1234, status: 'NotStarted', __typename: 'DocumentationPage' }],
            __typename: 'Project',
          },
          {
            id: 1138,
            name: 'GraphQL Complexity',
            description:
              'GraphQL gives the clients the ability to perform custom queries, with the exact data they need. It solves the problem of under or over fetching, but on the other hand, it allows a client to perform very complex queries, with objects that refer to other objects, or even with a loop if a circular relation is added. As a consequence, too many complex queries could take the server down. This risk can be mitigated by a complexity analysis strategy.',
            updatedDate: '2021-10-08T11:21:00.376Z',
            documentationPages: [
              { id: 1879, status: 'Draft', __typename: 'DocumentationPage' },
              { id: 1882, status: 'Draft', __typename: 'DocumentationPage' },
              { id: 1881, status: 'Completed', __typename: 'DocumentationPage' },
              { id: 1878, status: 'Draft', __typename: 'DocumentationPage' },
              { id: 1880, status: 'Draft', __typename: 'DocumentationPage' },
            ],
            __typename: 'Project',
          },
        ],
        page: { index: 1, size: 7, __typename: 'PageOutput' },
        total: 2,
        __typename: 'PaginatedProjectResponse',
      },
    }),
  );

const filterData = (variables?: Record<string, unknown>) => () => {
  const data = getProjectData();
  if (variables?.search) {
    const { items } = data.getProjectList;
    data.getProjectList.items = items.filter((i: any) => i.name.includes(variables.search));
  }

  if (variables?.page) {
    const pageIndex = (variables.page as any).index as number;
    const pageSize = (variables.page as any).size as number;
    const { items } = data.getProjectList;
    data.getProjectList.items = items.splice((pageIndex - 1) * pageSize, pageSize);
  }

  return { data };
};

export const getProjectListTestData = (query: DocumentNode, variables?: Record<string, unknown>): MockedResponse => ({
  request: {
    query,
    variables,
  },
  result: filterData(variables),
  newData: filterData(variables),
});
