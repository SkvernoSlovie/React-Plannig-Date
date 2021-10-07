import { EventActionEnum, EventState, EventAction } from './types';

const initialState: EventState = {
  guests: [],
  events: [],
};

export const EventReducer = (state = initialState, action: EventAction): EventState => {
  switch (action.type) {
    case EventActionEnum.SET_EVENTS:
      return { ...state, events: action.payload };
    case EventActionEnum.SET_GUESTS:
      return { ...state, guests: action.payload };
    default:
      return state;
  }
};
