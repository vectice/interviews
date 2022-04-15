import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { getProjectListTestData } from './__mocks__/project-list-data';
import { GET_PROJECT_LIST } from './getProjectList';

import App from './App';

describe('Page - Workspace Projects', () => {
  const mocks: MockedResponse[] = [
    getProjectListTestData(GET_PROJECT_LIST, {
      workspaceIdList: [2],
      pageIndex: 1,
      pageSize: 5,
    }),
    getProjectListTestData(GET_PROJECT_LIST, {
      workspaceIdList: [2],
      pageIndex: 2,
      pageSize: 5,
    }),
  ];

  it('should display the list of projects with pagination', async () => {
    render(
      <MockedProvider
        mocks={mocks}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' },
        }}
      >
        <App />
      </MockedProvider>,
    );

    screen.getByRole('heading', { name: /Projects/i });

    await screen.findByRole<HTMLUListElement>('list');
    const listItems = screen.getAllByRole<HTMLLIElement>('listitem');
    expect(listItems.length).toBe(5);

    const page2 = screen.getByRole<HTMLButtonElement>('button', { name: /2/i });

    userEvent.click(page2);

    await screen.findByRole<HTMLUListElement>('list');
    const listItems2 = screen.getAllByRole<HTMLLIElement>('listitem');
    expect(listItems2.length).toBe(2);
  });
});
