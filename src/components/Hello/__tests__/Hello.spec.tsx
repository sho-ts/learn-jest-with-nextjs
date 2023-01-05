import React from 'react';
import { render, waitFor } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import userEvent from '@testing-library/user-event';
import Hello from '..';

const queryClient = new QueryClient();

const wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Hello', () => {
  describe('router', () => {
    const push = jest.fn();

    jest
      .spyOn(require('next/router'), 'useRouter')
      .mockReturnValue({ push });

    window.alert = jest.fn();

    it('success handleSubmit', async () => {
      const user = userEvent.setup();
      const { getByText } = render(<Hello />, { wrapper });

      const button = getByText('Click Me');

      await waitFor(async () => {
        await user.click(button);
      });

      expect(push).toHaveBeenCalledWith('/');
    });

    it('failure handleSubmit', async () => {
      const user = userEvent.setup();
      const { getByText } = render(<Hello e />, { wrapper });

      const button = getByText('Click Me');

      await waitFor(async () => {
        await user.click(button);
      });

      expect(window.alert).toHaveBeenCalledWith('test-error');
    })
  });
});
