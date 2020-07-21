import '@testing-library/jest-dom/extend-expect';
import { useSearch } from './use-search';

jest.mock('./use-search', () => ({
  useSearch: jest.fn(),
}));

import React from 'react';
import { render } from '@testing-library/react';
import { TreatProvider } from 'react-treat';

import theme from '../../ds/theme/theme.treat';
import Search from './search';

type RenderParams = Parameters<typeof render>;

const mockedUseSearch = useSearch as jest.Mock<ReturnType<typeof useSearch>>;

function renderWithProvider(
  element: RenderParams[0],
  options?: RenderParams[1],
) {
  return render(
    <TreatProvider theme={theme}>{element}</TreatProvider>,
    options,
  );
}

describe('Search', () => {
  test('displays nothing when no query is passed', () => {
    mockedUseSearch.mockImplementation(() => ({ status: 'inactive' }));

    const { queryByTestId } = renderWithProvider(<Search query={''} />);

    expect(queryByTestId('search-results')).toBeNull();
  });

  test('displays nothing when query is loading', () => {
    mockedUseSearch.mockImplementation(() => ({ status: 'loading' }));

    const { queryByTestId } = renderWithProvider(<Search query={''} />);

    expect(queryByTestId('search-results')).toBeNull();
  });
});
