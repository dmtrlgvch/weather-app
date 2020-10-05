import React,{useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { getCityByName } from '../../api/getWeather'
import { addCityState } from "../../recoil/selectors";
import { addCityError } from "../../recoil/atoms";
import { useSetRecoilState, useRecoilState } from 'recoil';


const useStyles = makeStyles((theme) => ({
  formWrapper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formTitle: {
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '50px'
    },
  },
  submit: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
}));


export default function StartPageAddCity() {
  const classes = useStyles();
  const [queryValue, setQueryValue] = useState('')
  const [queryError, setQueryError] = useRecoilState(addCityError)
  const addCity = useSetRecoilState(addCityState)

  function onChange(event) {
    setQueryValue(event.target.value)
    setQueryError(null)
  }

  async function getCityName(e) {
    e.preventDefault()
    let query = (e.target.city.value).trim()
    const city = await getCityByName(query)
    if (city) {
      addCity(city)
      setQueryValue('')
    } else {
      setQueryError({text: "City not found"})
    }

  }

  return (
    <div className={classes.formWrapper}>
      <CssBaseline />

      <Typography variant="h1" className={classes.formTitle}>
        Add your city
        
      </Typography>
      <form className={classes.form} noValidate onSubmit={getCityName}>
        <TextField
          className={classes.input}
          variant="outlined"
          required
          value={queryValue}
          onChange={onChange}
          fullWidth
          id="add-city-input"
          label="City Name"
          type='search'
          name="city"
          error={!!queryError}
          helperText={queryError && queryError.text}
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}