import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import ChartTemperature from '../ChartTemperature'
import { getForecastById } from '../../api/getWeather'

import {
  useParams
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
  media: {
    width: 151,
  },
  weatherDescription: {
    textTransform: 'capitalize'
  },
  characteristicsItem: {
    display: 'flex',
  },
  characteristicsValue: {
    marginLeft: '10px',
    marginRight: '20px'
  }

}));

export default function WeatherCityFullInfo() {
  const classes = useStyles();
  let { id } = useParams();
  const [weather, setWeather] = useState(null)


  useEffect(() => {
    if (id) {
      (async () => {
        getWeather(id) 
      })()
    }
  }, [])

  async function getWeather(id) {
    let data = await getForecastById(id)
    setWeather(data)
  }

  return (
    <Card className={classes.root}>
      {!weather ? <CircularProgress/> : <>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Weather icon"
          height="140"
          image={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
          title="Clear Sky Icon"
        />

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h2" component="h2">
              {weather.city.name}
            </Typography>


            <Typography className={classes.temperature} variant="h3" component="h2">
              {Math.round(weather.list[0].main.temp)} &deg;C
              </Typography>
            <Typography className={classes.weatherMain} variant="h2" component="h3">
              {weather.list[0].weather[0].main}
            </Typography>
            <Typography className={classes.weatherDescription} variant="h4" component="h4">
              {weather.list[0].weather[0].description}
            </Typography>


            <Grid container spacing={0}>
              <Grid item xs={12} sm={6}>
                <dl className={classes.weatherCharacteristics}>
                  <div className={classes.characteristicsItem}>
                    <dt className={classes.characteristicsLabel}>Feels Like:</dt>
                    <dd className={classes.characteristicsValue}>{Math.round(weather.list[0].main.feels_like)} &deg;C</dd>
                  </div>

                  <div className={classes.characteristicsItem}>
                    <dt className={classes.characteristicsLabel}>Humidity:</dt>
                    <dd className={classes.characteristicsValue}>{Math.round(weather.list[0].main.humidity)} %</dd>
                  </div>

                  <div className={classes.characteristicsItem}>
                    <dt className={classes.characteristicsLabel}>Wind Speed:</dt>
                    <dd className={classes.characteristicsValue}>{weather.list[0].wind.speed} mps</dd>
                  </div>
                </dl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <dl className={classes.weatherCharacteristics}>
                  <div className={classes.characteristicsItem}>
                    <dt className={classes.characteristicsLabel}>Min:</dt>
                    <dd className={classes.characteristicsValue}>{Math.round(weather.list[0].main.temp_min)} &deg;C</dd>
                    <dt className={classes.characteristicsLabel}>Max:</dt>
                    <dd className={classes.characteristicsValue}>{Math.round(weather.list[0].main.temp_max)} &deg;C</dd>
                  </div>

                  <div className={classes.characteristicsItem}>
                    <dt className={classes.characteristicsLabel}>Pressure:</dt>
                    <dd className={classes.characteristicsValue}>{weather.list[0].main.pressure} Pa</dd>
                  </div>

                  <div className={classes.characteristicsItem}>
                    <dt className={classes.characteristicsLabel}>Wind Degree:</dt>
                    <dd className={classes.characteristicsValue}>{weather.list[0].wind.deg} &deg;</dd>
                  </div>
                </dl>
              </Grid>

            </Grid>

            <ChartTemperature list={weather.list} />

          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={() => getWeather(id)}>
              Update
          </Button>
          </CardActions>
        </div></>}
    </Card>
  );
}
