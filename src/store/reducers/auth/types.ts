import { IUser } from '../../../models/IUser';

export interface AuthState {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string;
}

export enum AuthActionsEnum {
  SET_AUTH = 'SET_AUTH',
  SET_ERROR = 'SET_ERROR',
  SET_USER = 'SET_USER',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

interface AuthStateAction {
  type: AuthActionsEnum.SET_AUTH;
  payload: boolean;
}

interface SetErrorAction {
  type: AuthActionsEnum.SET_ERROR;
  payload: string;
}

interface SetUserAction {
  type: AuthActionsEnum.SET_USER;
  payload: IUser;
}

interface SetLoadingAction {
  type: AuthActionsEnum.SET_IS_LOADING;
  payload: boolean;
}

export type AuthAction = AuthStateAction | SetErrorAction | SetUserAction | SetLoadingAction;
