import { fireEvent, render, screen } from '@testing-library/react';

import ModalWindow from './ModalWindow';

const chosenLoan = {
  available: 11959,
  id: 'id',
  title: 'title',
  time_remaining: 'expired',
};

const setup = () => {
  const setClicked = jest.fn();
  const utils = render(
    <ModalWindow chosenLoan={chosenLoan} setClicked={setClicked} />
  );
  const submitBtn = screen.getByTestId('submit');
  const input = screen.getByTestId('input');

  return {
    input,
    submitBtn,
    ...utils,
  };
};

describe('ModalWindow', () => {
  it('Input value contains letters', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input.value).not.toBe('abc');
  });

  it('Input value contains non-digits', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '#%*/|^&)' } });
    expect(input.value).not.toBe('#%*/|^&)');
  });
  it('Input value is appropriate number', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 3 } });
    expect(input.value).toBe('3');
  });

  it('Form is submitted with decimal number less than 1', () => {
    const setClicked = jest.fn();
    render(<ModalWindow chosenLoan={chosenLoan} setClicked={setClicked} />);

    const submitBtn = screen.getByTestId('submit');
    const input = screen.getByTestId('input');

    fireEvent.change(input, { target: { value: 0.5 } });
    fireEvent.click(submitBtn);
    expect(setClicked).toHaveBeenCalledTimes(0);
  });

  it('Form is submitted with sum higher than available', () => {
    const setClicked = jest.fn();
    render(<ModalWindow chosenLoan={chosenLoan} setClicked={setClicked} />);

    const submitBtn = screen.getByTestId('submit');
    const input = screen.getByTestId('input');

    fireEvent.change(input, { target: { value: 11960 } });
    fireEvent.click(submitBtn);
    expect(setClicked).toHaveBeenCalledTimes(0);
  });

  it('Form is submitted with appropriate number', () => {
    const setClicked = jest.fn();
    render(<ModalWindow chosenLoan={chosenLoan} setClicked={setClicked} />);

    const submitBtn = screen.getByTestId('submit');
    const input = screen.getByTestId('input');

    fireEvent.change(input, { target: { value: 1 } });
    fireEvent.click(submitBtn);
    expect(setClicked).toHaveBeenCalledTimes(1);
  });
});
