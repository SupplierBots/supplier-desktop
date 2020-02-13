import {
  ControllerState,
  ControllerActionTypes,
  SET_CHROMIUM_PATH,
  SET_APP_DATA_PATH,
} from './types';
const initialState: ControllerState = {
  lockTasks: false,
  chromiumPath: '',
  appData: '',
};

export const controllerReducer = (
  state = initialState,
  action: ControllerActionTypes,
): ControllerState => {
  switch (action.type) {
    case SET_CHROMIUM_PATH: {
      return {
        ...state,
        chromiumPath: action.path,
      };
    }

    case SET_APP_DATA_PATH: {
      return {
        ...state,
        appData: action.path,
      };
    }
    default:
      return state;
  }
};
