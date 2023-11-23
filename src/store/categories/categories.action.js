import CATEGORIES_ACTION_TYPES from './categories.types';

// export const createAction = (type, payload) => ({ type, payload });
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);