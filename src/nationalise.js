import React,{useState, useEffect} from 'react';
import axios from 'axios';
import  lookup from 'country-code-lookup';

import './nationalise.css'

const Nationalise = () => {
    const [result, setResult] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('')

    useEffect(()=>{
        console.log('name changed to ', name)
        fetchData()
    },[name])
   
    const fetchData = async() => {
        if(name){ 
            const datum = await axios.get(`https://api.nationalize.io/?name=${name}`)
            console.log('data is ', datum)
            setResult(datum)
            clear()
        }else{
            console.log('no name')
        }
    }
    const handleClick = () => {
        setError('')
        setResult('')
       const naam = document.getElementById('name').value
       if(naam){
        setName(naam)
        console.log('name to search is ', name.length)
       }else{
        setError('Please Enter a name!')
       }
      
    }
      const clear = () => {
  		document.getElementById('name').value = ''
  }
    return(
        <div className="container">
            <h1>Predict the nationality of a name</h1>
            <hr />
            <div className="wrapper">
                <input type="text" id="name" placeholder="Please Enter a Name..."/>
                <button onClick={handleClick}>Click me</button>
                <Display result={result} name={name} error={error}/>
            </div>
        </div>
    )
}

const Display = ({result, name, error}) => {
   
    return(
        <div className="display">
            {result && (result.data.country.length > 0 ? <h3>The name "{name}" has following results</h3> : <h3>No results found...</h3>)}
            {result && result.data.country.map((c,i)=><ConvertToCountry key={i} c={c} />)}
            {error && <p className="error">{error}</p>}
        </div>
    )
}

const ConvertToCountry = ({i, c}) => {
    const res = lookup.byIso(c.country_id).country
    console.log('res ',res)
    return(
        <div>
            <p className="Result" i={i}>{res}, {c.country_id} with a probability of {parseFloat(c.probability).toFixed(2)}</p>
        </div>
    )
}
export default Nationalise;