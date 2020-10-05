import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';


export default function ChartTemperature({ list }) {
  const chartHeight = 50;
  const boxHeight = 20;
  const useStyles = makeStyles((theme) => ({
    chartTemperature: {
      height: `${chartHeight}px`,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },

  }));
  const classes = useStyles();

  let temps = list.map(el => el.main.temp)
  let min = Math.min(...temps)
  let max = Math.max(...temps)

  function findPercentFromRange(x, r0, r1) {
    return (x - r0) * 100 / (r1 - r0)
  }

  function getTemperatureColor(temp) {
    const minTemp = -50
    const maxTemp = 50
    const minHue = 270
    //const maxHue = 0
    if (temp < minTemp) {
      temp = -50
    } else if (temp > maxTemp) {
      temp = 50
    }
    let temperaturePercent = findPercentFromRange(temp, minTemp, maxTemp)
    let hue = ((-1 * minHue / 100) * temperaturePercent) + minHue
    return hue
  }

  return (
    <Box className={classes.chartTemperature}>
      {list.map(hour => {
        let percent = findPercentFromRange(hour.main.temp, min, max)
        let hue = getTemperatureColor(hour.main.temp)
        let px = (((chartHeight - boxHeight) / 100) * percent) * -1
        return <TemperatureBox key={hour.dt} temp={hour.main.temp} px={px} hue={hue} height={boxHeight}></TemperatureBox>
      })}
    </Box>
  )
}

function TemperatureBox({ temp, px, height, hue}) {
  const useStyles = makeStyles((theme) => ({
    value: {
      width: '12%',
      textAlign: 'center',
      height: `${height}px`,
      backgroundColor: `hsla(${hue}, 100%, 50%, .3)`,
      transform: `translateY(${px}px)`,
      display: 'inline-flex',
      alignItems: 'center'
    }
  }));
  const classes = useStyles();
  return (
    <Box className={classes.value}>
      <span>{Math.round(temp)} &deg;C</span>
    </Box>
  )
}