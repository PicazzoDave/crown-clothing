import CATEGORIES_ACTION_TYPES from './categories.types';
// export const createAction = (type, payload) => ({ type, payload });
import { createAction } from '../../utils/reducer/reducer.utils';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const fetchCategoriesStart = () => 
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
    );

export const FETCH_CATEGORIES_SUCCESS = (categoriesArray) => 
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, 
        categoriesArray
    );

export const FETCH_CATEGORIES_FAILED = (error) => 
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, 
        error
    );

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());

    try {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        dispatch(FETCH_CATEGORIES_SUCCESS(categoriesArray));
    } catch (error) {
        dispatch(FETCH_CATEGORIES_FAILED(error));
    }
}