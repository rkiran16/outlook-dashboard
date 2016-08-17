/**
 * Created by rkanculakunta on 2/8/16.
 */

import { FETCH_WEATHER } from '../actions/weather-action';
const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_WEATHER :
            return [action.payload.data, ...state];  // [city , city, city] NOT [city , [city,city]]
    }
    return state;
}