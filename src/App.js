import { useEffect, useState } from 'react';

import currentLoans from './assets/current-loans.json';
import LoansList from './components/loansList/LoansList';

function App() {
  let { loans } = currentLoans;
  const [data, setData] = useState([]);
  const [totalAmountAvailable, setTotalAmountAvailable] = useState(0);

  useEffect(() => {
    const newLoans = JSON.parse(JSON.stringify(loans));

    const newData = newLoans.map((product) => {
      for (let key in product) {
        if (
          typeof product[key] === 'string' &&
          parseFloat(product[key].replace(/,/g, ''))
        ) {
          product[key] = parseFloat(product[key].replace(/,/g, ''));
        } else continue;
      }

      if (new Date(product.term_remaining) - new Date() < 0) {
        product.time_remaining = 'expired';
      } else {
        const now = +new Date();
        const future = +new Date(product.term_remaining);
        const diff = future - now;

        let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30.416);
        days = Math.floor(days - months * 30.416);

        const remainingTime = `${+days ? `${days} day(s)` : ''} ${
          +months ? `${months} month(s)` : ''
        } `;

        product.time_remaining = remainingTime;
      }
      product.invested = false;
      return product;
    });
    setData(newData);
  }, []);

  useEffect(() => {
    let total = 0;
    data.forEach((loan) => {
      total += loan.available;
    });
    setTotalAmountAvailable(total);
  }, [data]);

  return (
    <div className="container">
      {data.length && <LoansList data={data} setData={setData} />}
      <div className="total">
        <div>Total amount available for investment:</div>
        <div>
          $
          {Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
          }).format(totalAmountAvailable)}
        </div>
      </div>
    </div>
  );
}

export default App;
