import {ActionType} from '../action-types';
import { Action, MoveCellAction, DeleteCellAction, UpdateCellAction, InsertCellBeforeAction, Direction } from '../actions/index';
import {CellType} from '../cell'

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    };
}

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type:  ActionType.DELETE_CELL,
        payload: id
    }
}

export const moveCell = (id: string, direction:Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}

export const insetCellBefore = (id: string, cellType: CellType): InsertCellBeforeAction => {
    return {
        type: ActionType.INSERT_CELL_BEFORE,
        payload:{
            id,
            type: cellType
        }
    }
}