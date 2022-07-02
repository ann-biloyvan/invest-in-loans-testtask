import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoansList from './LoansList';

const data = [
  {
    amount: 85754,
    annualised_return: 8.6,
    available: 11959,
    id: 1,
    ltv: 21.1,
    title: 'test',
    transhe: 'a',
    term_remaining: 864000,
    time_remaining: 'expired',
    invested: false,
  },
];

describe('LoansList', () => {
  it('LoanList modal button click', () => {
    render(<LoansList data={data} />);
    const buttonEl = screen.getByText(/Invest/);
    expect(screen.queryByTestId('input')).toBeNull();
    userEvent.click(buttonEl);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });
});
