import { atom } from 'recoil';


if (!localStorage.cityList) {
    localStorage.cityList = JSON.stringify([])
  }

export const cityListAtom = atom({
    key: 'cityListAtom',
    default: JSON.parse(localStorage.cityList)
})


export const addCityError = atom({
  key: 'addCityError',
  default: null
})