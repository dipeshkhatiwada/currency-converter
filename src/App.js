import React,{useState, useEffect} from 'react';
import './App.css';
import CurrencyRow from "./CurrencyRow";
const BASE_API = `https://api.exchangeratesapi.io/latest`;
function App() {
  const [currencyOption, setCurrencyOption] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountfromCurrency, setAmountfromCurrency] = useState(true)

  let toAmount, fromAmount
  if(amountfromCurrency){
    fromAmount = amount
    toAmount=amount*exchangeRate
  }else{
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  // console.log(exchangeRate)
  useEffect(() => {
    fetch(BASE_API)
    .then(res=>res.json())
    .then(data =>{
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOption([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])
  useEffect(() => {
    if(fromCurrency != null && toCurrency != null){
      fetch(`${BASE_API}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency,toCurrency])

  function handelFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountfromCurrency(true)
  }
  
  function handelTOAmountChange(e) {
    setAmount(e.target.value)
    setAmountfromCurrency(false)
  }

  return (
    <>
      <h1>Currency converter!!</h1>
      <CurrencyRow
      currencyOption={currencyOption}
      selectedCurrency={fromCurrency}
      CountryChange={e => setFromCurrency(e.target.value)}
      ChangeAmount={handelFromAmountChange}
      amount={fromAmount}
      />
      <h2>=</h2>
      <CurrencyRow
      currencyOption={currencyOption}
      selectedCurrency={toCurrency}
      CountryChange={e => setToCurrency(e.target.value)}
      ChangeAmount={handelTOAmountChange}
      amount={toAmount}
      />
    </>
  );
}

export default App;
