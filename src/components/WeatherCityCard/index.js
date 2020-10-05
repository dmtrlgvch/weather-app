import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getWeatherById } from '../../api/getWeather'

import {
  useHistory
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    width: 'auto'
  },
  weatherDescription: {
    textTransform: 'capitalize'
  }
});

export default function WeatherCityCard({ city }) {
  const classes = useStyles();
  const history = useHistory();
  const [weather, setWeather] = useState(null)


  useEffect(() => {
    getWeather(city)
  }, [])

  async function getWeather(city) {
    let data = await getWeatherById(city.id)
    setWeather(data)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push(`/city/${city.id}`)}>
        {!weather ? <CircularProgress /> : <>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Weather icon"
            height="140"
            image={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            title="Clear Sky Icon"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {city.name}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.temperature} variant="h5" component="h2">
                  {Math.round(weather.main.temp)} &deg;C
              </Typography>
                <Typography className={classes.weatherMain} variant="h4" component="h3">
                  {weather.weather[0].main}
                </Typography>
                <Typography className={classes.weatherDescription} variant="h6" component="h4">
                  {weather.weather[0].description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </>}
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={()=>getWeather(city)}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
}
