import React from 'react';
import './App.css';

export default function CurrencyRow(props) {
    const {
        currencyOption,
        selectedCurrency,
        CountryChange,
        amount,
        ChangeAmount,
    } = props
  return (
    <>
        <div>
            <input type="number" value={amount} onChange={ChangeAmount} />
            <select value={selectedCurrency} onChange={CountryChange}>
                {currencyOption.map((option,index)=>(
                    <option key={index} value={option}>{option}</option>

                ))}
            </select>
        </div>
    </>
  );
}
