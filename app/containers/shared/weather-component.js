/**
 * Created by rkanculakunta on 2/18/16.
 */


import React, { Component } from 'react';
import moment from 'moment';

export default class WeatherComponent extends Component {
    constructor(props) {
        super(props);
    }

    getIcon(current_icon) {
        switch (current_icon) {
            case 'snow':
            case 'sleet':
                return <div className='icon flurries'>
                    <div className='cloud'></div>
                    <div className='snow'>
                        <div className='flake'></div>
                        <div className='flake'></div>
                    </div>
                </div>;
            case 'partly-cloudy-day':
                return <div className='icon sun-shower'>
                    <div className='cloud'></div>
                    <div className='sun'>
                        <div className='rays'></div>
                    </div>
                    <div className='rain'></div>
                </div>;
            case 'clear-day':
                return <div className='icon sunny'>
                    <div className='sun'>
                        <div className='rays'></div>
                    </div>
                </div>;
            case 'thunderstorm':
            case 'hail':
                return <div className='icon thunder-storm'>
                    <div className='cloud'></div>
                    <div className='lightning'>
                        <div className='bolt'></div>
                        <div className='bolt'></div>
                    </div>
                </div>;
            case 'cloudy':
                return <div className='icon cloudy'>
                    <div className='cloud'></div>
                    <div className='cloud'></div>
                </div>;
            case 'rain':
                return <div className='icon rainy'>
                    <div className='cloud'></div>
                    <div className='rain'></div>
                </div>;
            default:
                return <div className='icon cloudy'>
                    <div className='cloud'></div>
                    <div className='cloud'></div>
                </div>;
        }
    }

    formatDay(data) {
        if (moment.unix(data).format("ddd") == moment().format("ddd")) {
            return 'currently';
        } else {
            return moment.unix(data).format("ddd");
        }
    }


    getTemperature(data) {
        if (data.temperature != undefined) {
            return data.temperature;
        } else {
            return data.apparentTemperatureMax;
        }
    }


    render() {
        return (
            <div className="">
                <span className="current-day">{this.formatDay(this.props.data.time)}</span>

                <div className="weather-info">
                    <div className="weather">
                        {this.getIcon(this.props.data.icon)}
                        <div className="temperature">
                            <span>{Math.round(this.getTemperature(this.props.data))}<span className="scale">&#8457;</span></span>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}
