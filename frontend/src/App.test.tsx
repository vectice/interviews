import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { getProjectListTestData } from './__mocks__/project-list-data';
import { GET_PROJECT_LIST } from './getProjectList';

import App from './App';

describe('Page - Workspace Projects', () => {
});
