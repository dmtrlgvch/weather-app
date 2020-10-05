import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import WeatherCityCard from '../WeatherCityCard'
import { cityListState } from "../../recoil/selectors";
import { useRecoilValue } from 'recoil';

const useStyles = makeStyles((theme) => ({
  cityList: {
    paddingTop: '40px',
  },
}));

export default function WeatherCityList() {
  const classes = useStyles();
  const cityList = useRecoilValue(cityListState)

  return (
    <div className={classes.cityList}>
      <CssBaseline />

      <Grid container spacing={3}>
        {cityList.map(city => (
          <Grid key={city.id} item xs={12} sm={6} md={4}>
            <WeatherCityCard city={city}/>
          </Grid>
        ))}
      </Grid>

    </div>
  );
}