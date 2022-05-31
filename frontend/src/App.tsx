import React, { useEffect, useState } from 'react';

import { PAGE_SIZE, WORKSPACE_ID_LIST } from './constants';
import { GET_PROJECT_LIST } from './getProjectList';
import { useQuery } from '@apollo/client';

import styles from './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, refetch } = useQuery(GET_PROJECT_LIST, {
    fetchPolicy: 'cache-only',
    variables: {
      workspaceIdList: WORKSPACE_ID_LIST,
      page: {
        size: PAGE_SIZE,
        index: 1,
      },
    },
  });

  useEffect(() => {
    refetch({
      workspaceIdList: WORKSPACE_ID_LIST,
      page: {
        size: PAGE_SIZE,
        index: currentPage,
      },
    });
  }, [currentPage]);

  const nbOfPage = new Array(Math.floor((data?.getProjectList.total || 0) / PAGE_SIZE)).map((_, i) => i + 1);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <div data-testid="project-title" className={styles.title}>Project</div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div data-testid="project-title" className={styles.title}>Project</div>
        {data?.getProjectList.items && (
          <ul>
            {data?.getProjectList.items.map((item) => (
              <a href={`/project/${item.id}`}>
                <li>
                  <div>{item.name}</div>
                  <div>{item.description}</div>
                  <div>Last edited {item.updatedDate}</div>
                </li>
              </a>
            ))}
          </ul>
        )}
      </header>
      <div className={styles.pagination}>
        {nbOfPage.map((page, index) => (
          <div data-testid={`page-${index + 1}`} onClick={() => setCurrentPage(page)}>{index + 1}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
