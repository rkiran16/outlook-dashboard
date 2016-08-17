/**
 * Created by rkanculakunta on 2/8/16.
 */

import axios from 'axios';

const WEATHER_API_KEY = "a70da30d51ba35ce9a31298280403745";
let lat = "39.84228602";
let long = "-82.96875";
let WEATHER_URL = `http://cors.io/?u=https://api.forecast.io/forecast/${WEATHER_API_KEY}/${lat},${long}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather() {
    const request = axios({
        dataType: 'jsonp',
        method: 'get',
        url: WEATHER_URL
    });
    console.log(request);
    return {
        type: FETCH_WEATHER,
        payload: request
    }
}