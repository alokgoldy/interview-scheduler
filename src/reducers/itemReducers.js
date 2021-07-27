import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_INDEX,
  UPDATE_ITEM,
} from '../constants/types';

if (localStorage.getItem('candidates') == null)
  localStorage.setItem('candidates', JSON.stringify([]));

const initialState = {
  currentIndex: -1,
  candidates: JSON.parse(localStorage.getItem('candidates')),
};

const itemReducer = (state = initialState, action) => {
  const list = JSON.parse(localStorage.getItem('candidates'));

  switch (action.type) {
    case ADD_ITEM:
      list.push(action.payload);
      localStorage.setItem('candidates', JSON.stringify(list));
      return {
        ...state,
        candidates: JSON.parse(localStorage.getItem('candidates')),
      };
    case DELETE_ITEM:
      list.splice(action.payload, 1);
      localStorage.setItem('candidates', JSON.stringify(list));
      return {
        ...state,
        candidates: JSON.parse(localStorage.getItem('candidates')),
      };
    case UPDATE_INDEX:
      return {
        ...state,
        currentIndex: action.payload,
      };
    case UPDATE_ITEM:
      list[state.currentIndex] = action.payload;
      localStorage.setItem('candidates', JSON.stringify(list));
      return {
        currentIndex: -1,
        candidates: JSON.parse(localStorage.getItem('candidates')),
      };
    default:
      return state;
  }
};

export default itemReducer;
