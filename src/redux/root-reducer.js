import {combineReducers} from 'redux';
import titlesReducer from './titles-reducer'



export default combineReducers({
    titles: titlesReducer
})