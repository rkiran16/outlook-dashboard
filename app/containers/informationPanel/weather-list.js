/**
 * Created by rkanculakunta on 2/8/16.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../../actions/weather-action';
import WeatherComponent from '../shared/weather-component';


class Weather extends Component {
    componentDidMount() {
        this.props.fetchWeather();
        setInterval(function() {
            this.props.fetchWeather();
        },120 * 60 * 1000)
    }

    render() {
        return (
            <div className="information-panel_weather">
                {this.props.weather.map((data, index) => {
                    // Current Weather
                    return <WeatherComponent key={index} data={data.currently}/>
                })}
            </div>
        )
    }
}


function mapStateToProps({weather}) {
    return {weather};  // { weather }} === {weather : weather}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchWeather}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);