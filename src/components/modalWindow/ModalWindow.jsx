import React, { useState, useRef, useEffect } from 'react';

import classes from './ModalWindow.module.css';

export default function ModalWindow({ chosenLoan, data, setData, setClicked }) {
  const { available, id, title, time_remaining } = chosenLoan;
  const modalWindowRef = useRef();

  function handleClickOutside(event) {
    if (
      modalWindowRef.current &&
      !modalWindowRef.current.contains(event.target)
    ) {
      setClicked(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalWindowRef]);

  const [value, setValue] = useState(1);

  const investHandler = (e) => {
    if (value > available) {
      alert(`Sum can't be greater than available amount`);
    } else if (value >= 0 && value < 1) {
      alert('Sum has to be at least 1$ or higher');
    } else if (value && value >= 1) {
      alert('Successfully invested in the loan');
      const newData = [...data].map((loan) => {
        if (loan.id === id) {
          loan.invested = true;
          loan.available =
            loan.available - value > 0
              ? +(loan.available - value).toFixed(2)
              : 0;
          return loan;
        }
        return loan;
      });
      setData(newData);
      setClicked(false);
    } else {
      alert('Please, enter only digits');
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.modal}>
      <dialog className={classes.modal_content} ref={modalWindowRef}>
        <div className={classes.close_modal_button_container}>
          <button
            type="button "
            className={classes.close_modal_button}
            onClick={() => setClicked(false)}
          >
            X
          </button>
        </div>
        <h1>Invest in loan</h1>
        <h3>{title}</h3>
        <p>
          Amount available: $
          {Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
          }).format(available)}
        </p>
        <p>
          Loan ends in:
          {time_remaining}
        </p>
        <h2>Investment amount</h2>
        <form onSubmit={submitHandler}>
          <input
            required
            type="number"
            min="1"
            max={available}
            onChange={(e) => setValue(+e.target.value)}
            data-testid="input"
            value={value}
          />
          <button
            type="submit"
            onClick={investHandler}
            data-testid="submit"
            className={classes.modal_content_button}
          >
            Invest
          </button>
        </form>
      </dialog>
    </div>
  );
}
