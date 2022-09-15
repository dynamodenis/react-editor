import produce from "immer";
import { ActionType } from "../action-types";
import {Action} from '../actions'
import {Cell} from '../cell'

interface CellsState{
    error:string | null,
    loading: boolean,
    order: string[],
    data: {
        [key: string] : Cell
    }
}

const initialState: CellsState = {
    error: null,
    loading:false,
    order:[],
    data:{}
}

const reducer = produce((state: CellsState = initialState, action:Action) => {
    switch (action.type) {
        case ActionType.DELETE_CELL:
            return state;
        case ActionType.INSERT_CELL_BEFORE:
            return state;
        case ActionType.MOVE_CELL:
            return state;
        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload;
            // update props usings immer
            state.data[id].content = content;
            return
        default:
            return state;
    }
    
});

export default reducer