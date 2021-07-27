import {
  ADD_ITEM,
  UPDATE_INDEX,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../constants/types';

export const addItem = (contact) => ({
  type: ADD_ITEM,
  payload: contact,
});

export const updateIndex = (index) => ({
  type: UPDATE_INDEX,
  payload: index,
});

export const updateItem = (contact) => ({
  type: UPDATE_ITEM,
  payload: contact,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});
