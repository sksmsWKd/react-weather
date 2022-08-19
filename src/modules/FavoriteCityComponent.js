import styled from "styled-components";
import { useEffect, useState } from "react";
import Axios from "axios";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  padding: 5px 1px;
  margin: 10px;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 #555;
  background: white;
  font-family: Montserrat;
`;
const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  border: black solid 1px;
`;


const FavoriteCityComponent = (props) => {
  const [cities, setCities] = useState([])
  const city = ''
  function cityset(city){
    city = city

  }
  const [weather, updateWeather] = useState()
  const fetchWeather = async (e) => {
    e.preventDefault();
    console.log(city)
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`,
    );
    updateWeather(response.data);
  };

  function del(id){
    fetch(`http://localhost:3001/cities/${city.id}`, {
      method: "DELETE"
    })
  }
  useEffect(() => {
    fetch('http://localhost:3001/cities').then(res =>{
      return res.json()
    }).then(data => {
      setCities(data);
    });
  }, []);


  return ( 
  <>
    {cities.map((city) => (
        <Container>
          <SearchBox onSubmit={[cityset(city.city),fetchWeather]}>
      
           <input key={city.id} type="hidden"
          value={city.city}
        />
        <button type="submit">{city.city} </button>
    
        </SearchBox>
        <button onClick={[ del(city.id)]}>x</button>
        </Container>))}
  </> 
  );
}

export default FavoriteCityComponent;
