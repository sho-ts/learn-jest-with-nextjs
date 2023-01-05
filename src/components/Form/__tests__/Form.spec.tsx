import React from 'react';
import {
  render,
  waitFor,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Form } from '..';

describe('Form', () => {
  it('success', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<Form />);
    const titleInput = getByTestId(
      'title'
    ) as HTMLInputElement;
    const contentInput = getByTestId(
      'content'
    ) as HTMLInputElement;
    const submit = getByTestId('submit');

    await user.type(titleInput, '1234567890');
    await user.type(contentInput, '12345678901234567890');
    await user.click(submit);

    await waitFor(async () => {
      expect(
        screen.queryByTestId('title-error')
      ).toBeNull();
      expect(
        screen.queryByTestId('content-error')
      ).toBeNull();
      expect(submit).toBeEnabled();
    });
  });

  describe('failure', () => {
    it('max', async () => {
      const user = userEvent.setup();
      const { getByTestId } = render(<Form />);
      const titleInput = getByTestId(
        'title'
      ) as HTMLInputElement;
      const contentInput = getByTestId(
        'content'
      ) as HTMLInputElement;
      const submit = getByTestId('submit');

      await user.type(titleInput, '12345678901');
      await user.type(
        contentInput,
        '123456789012345678901'
      );
      await user.click(submit);

      await waitFor(async () => {
        expect(
          screen.getByTestId('title-error')
        ).toBeInTheDocument();
        expect(
          screen.getByTestId('content-error')
        ).toBeInTheDocument();
        expect(submit).toBeDisabled();
      });
    });

    it('min', async () => {
      const user = userEvent.setup();
      const { getByTestId } = render(<Form />);
      const titleInput = getByTestId(
        'title'
      ) as HTMLInputElement;
      const contentInput = getByTestId(
        'content'
      ) as HTMLInputElement;
      const submit = getByTestId('submit');

      await user.type(titleInput, '1234');
      await user.type(contentInput, '123456789');
      await user.click(submit);

      await waitFor(async () => {
        expect(
          screen.getByTestId('title-error')
        ).toBeInTheDocument();
        expect(
          screen.getByTestId('content-error')
        ).toBeInTheDocument();
        expect(submit).toBeDisabled();
      });
    });

    it('required', async () => {
      const user = userEvent.setup();
      const { getByTestId } = render(<Form />);
      const submit = getByTestId('submit');

      await user.click(submit);

      await waitFor(async () => {
        expect(
          screen.getByTestId('title-error')
        ).toBeInTheDocument();
        expect(
          screen.getByTestId('content-error')
        ).toBeInTheDocument();
        expect(submit).toBeDisabled();
      });
    });
  });
});
