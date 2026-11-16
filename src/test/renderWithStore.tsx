import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';

export const renderWithStore = (ui: React.ReactElement) => {
  const store = makeStore();
  const result = render(<Provider store={store}>{ui}</Provider>);
  return { store, ...result };
};
