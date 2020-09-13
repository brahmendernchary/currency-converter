import React,{useState,useEffect} from 'react';
import axios from 'axios';

const App = () => {
const [rateList, setRateList] = useState([]);
const [base, setBase] = useState('USD')

  useEffect(() => {
    getRates('USD')
  }, [])

  const getRates =async(base)=>{
    const data=await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
    const {rates} = data.data;
    
    const rateTemp= [];
    for (const [symbol,rate] of Object.entries(rates)) {
      rateTemp.push({symbol,rate});
    }
    setRateList(rateTemp);
  }
  return (
    <div className="App">
      <select className="custom-select" value={base} onChange={(e)=>{
        const value = e.target.value;
        setBase(value)
        getRates(value)
      }
      }>
        {rateList.map((d)=>(
          <option value={d.symbol} key={d.symbol}>{d.symbol}</option>
        ))}
        
      </select>
      <ul className='list-group'>
        {rateList.map((d)=>(
          <li className='list-group-item' key={d.symbol}>{d.symbol} -{d.rate}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
