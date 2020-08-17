import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');

	const handleGetWeather = (e) => {
		e.preventDefault();
		console.log('Button is clicked')
		const place = document.getElementById('city')
		const cou = document.getElementById('country')

		if(place.value !== '' && country.value !== ''){
			setCity(place.value)
			setCountry(cou.value)
			console.log('place ', place.value , 'country ', cou.value)
			fetchWeather()
		}else {
			console.log('please specify country and city!')
		}
	}
	const apiKey = "8ddceeacaf8b95fe943c88fc8389dee0";

	const fetchWeather = async () => {
		console.log('In weather fucntion')
		const data = await axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`)
		console.log('url is ', data)

		const newData = await JSON.stringify(data);
		console.log('new Data ', newData)
		console.log('temp ', newData.data .main.temp)
		// console.log('location ', newData.name, newData.sys.country)
		// console.log('Humidity ', newData.main.humidity)
		// console.log('description ', newData.weather[0].description)
	   
	
	}
  return(
    <div>
		<form className="form" id="">
			<input type="text" id="city" placeholder='City'/>
			<input type="text" id="country" placeholder='Country'/>
			<button onClick={handleGetWeather}>Get Weather</button>
		</form>
	</div>
  )
}


export default App;
