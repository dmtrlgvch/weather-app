import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { useHistory } from "react-router-dom";

import { cityListState, deleteCityState } from "../../recoil/selectors";
import { useRecoilValue, useSetRecoilState} from 'recoil';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoTitle: {
    flexGrow: 1,
  },
  toYourCitiesBtn: {
    marginRight: '25px'
  },
  addCityBtn: {
    marginRight: '25px'
  }
}));

export default function Header(props) {
  const history = useHistory()
  const classes = useStyles();
  const cityList = useRecoilValue(cityListState)
  const [anchorEl, setAnchorEl] = useState(null);

  const deleteCity = useSetRecoilState(deleteCityState)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.logoTitle}>
            Weather
          </Typography>
          {!cityList.length ? null : <Button className={classes.toYourCitiesBtn} 
            variant="contained" 
            color="primary" 
            onClick={()=> history.push('/')}
          >
            To your cities
          </Button>}

          <Button className={classes.addCityBtn} 
            variant="contained" 
            color="primary" 
            onClick={()=> history.push('/add')}
          >
            Add City
          </Button>
          <Button 
            className={classes.deleteCityBtn} 
            aria-controls="delete-city-menu" 
            aria-haspopup="true"
            variant="contained" 
            color="primary" 
            onClick={handleClick}
          >
            Delete City
          </Button>

          <Menu
            id="delete-city-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {cityList.length === 0 ? <MenuItem>Nothing to delete</MenuItem> : cityList.map((city, i) => <MenuItem key={city.id} onClick={() => deleteCity(i)}>&times; {city.name}</MenuItem>)}
          </Menu>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}


