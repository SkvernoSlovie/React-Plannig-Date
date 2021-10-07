import axios from 'axios';
import { AppDispatch } from '../..';
import { IUser } from '../../../models/IUser';
import {
  AuthActionsEnum,
  SetUserAction,
  AuthStateAction,
  SetLoadingAction,
  SetErrorAction,
} from './types';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({ type: AuthActionsEnum.SET_USER, payload: user }),
  setIsAuth: (auth: boolean): AuthStateAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: auth,
  }),
  setLoading: (isLoad: boolean): SetLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload: isLoad,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload: error,
  }),
  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setLoading(true));
      setTimeout(async () => {
        const responce = await axios.get<IUser[]>('/users.json');
        const mockUser = responce.data.find(
          (user: any) => user.username === username && user.password === password,
        );

        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);
          dispatch(AuthActionCreators.setIsAuth(true));
          dispatch(AuthActionCreators.setUser(mockUser));
        } else {
          dispatch(AuthActionCreators.setError('Некорректный логин или пароль'));
        }
        dispatch(AuthActionCreators.setLoading(false));
      }, 1000);
    } catch (e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка при логине'));
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};
