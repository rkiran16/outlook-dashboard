import { combineReducers } from 'redux';
import WeatherReducer from '../reducers/reducer_weather';
import MeetingRoomReducer from '../reducers/reducer_meeting_rooms';


const rootReducer = combineReducers({
    weather: WeatherReducer,
    meetingRoom: MeetingRoomReducer
});

export default rootReducer;
