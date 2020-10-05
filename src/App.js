import React from 'react';
import './App.css';

import Header from './components/Header'
import WeatherCityList from './components/WeatherCityList'
import PageAddCity from './components/PageAddCity'
import WeatherCityFullInfo from './components/WeatherCityCardFullInfo'

import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { cityListState } from "./recoil/selectors";
import { useRecoilValue } from 'recoil';

import Container from '@material-ui/core/Container';

function App() {
  const cityList = useRecoilValue(cityListState)
  return (
    <>  
      <Header/>
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/">
            {!cityList.length ? <PageAddCity/> : <WeatherCityList/> }
          </Route>
          <Route path="/city/:id">
            <WeatherCityFullInfo/>
          </Route>
          <Route path="/add">
            <PageAddCity/>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Container>     
    </>
  );
}

export default App;
