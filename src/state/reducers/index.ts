import { combineReducers } from 'redux'
import reducer from './cellReducer'


const reducers = combineReducers({
    cells: reducer
})


export default reducers;

export type RootState = ReturnType<typeof reducers>;