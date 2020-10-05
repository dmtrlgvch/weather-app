import { selector } from 'recoil';
import { cityListAtom, addCityError} from './atoms'


export const cityListState = selector({
    key: 'cityListSelector',
    get: ({ get }) => {
        const list = get(cityListAtom)
        localStorage.cityList = JSON.stringify(list)
        return list
    },
})
export const addCityState = selector({
    key: 'addCityState',
    set: ({ set }, newCity) => {
        set(cityListAtom, prevList=>{
            if (!prevList.some(city => city.id === newCity.id)) {
                return [...prevList, newCity]
            } else{
                set(addCityError, {text: 'City already added'})
                return prevList
            }
            
        })
    }
})
export const deleteCityState = selector({
    key: 'deleteCityState',
    set: ({ set }, index) => {
        set(cityListAtom, prevList=>{
            return [...prevList.slice(0, index), ...prevList.slice(index + 1)]
        })
    }
})


