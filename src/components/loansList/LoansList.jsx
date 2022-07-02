import React, { useState } from 'react';

import ModalWindow from '../modalWindow/ModalWindow';
import classes from './LoansList.module.css';

export default function LoansList({ data, setData }) {
  const [chosenLoan, setChosenLoan] = useState(null);
  const [clicked, setClicked] = useState(false);

  const chosenLoanHandler = (loanId) => {
    const loan = data.find(({ id }) => id === loanId);
    setChosenLoan(loan);
    setClicked(true);
  };
  return (
    <div className={classes.container}>
      {data?.map(
        ({
          amount,
          annualised_return,
          available,
          id,
          ltv,
          title,
          tranche,
          time_remaining,
          invested,
        }) => (
          <div key={id} className={classes.list_item}>
            <div>
              <h2>{title}</h2>
              <p>Annualized total return: {annualised_return}%</p>
              <p>
                Amount: $
                {Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 2,
                }).format(amount)}
              </p>
              <p>
                Amount available: $
                {Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 2,
                }).format(available)}
              </p>
              <p>Lifetime value: {ltv}</p>
              <p>Tranche: {tranche}</p>
              <p>Loan ends in: {time_remaining}</p>
            </div>
            <div className={classes.button_container}>
              {invested ? (
                <p className={classes.invested}>Invested</p>
              ) : (
                <p></p>
              )}
              <button type="button" onClick={() => chosenLoanHandler(id)}>
                Invest
              </button>
            </div>
          </div>
        )
      )}
      {clicked && (
        <ModalWindow
          chosenLoan={chosenLoan}
          data={data}
          setData={setData}
          setClicked={setClicked}
        />
      )}
    </div>
  );
}
