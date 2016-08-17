/**
 * Created by rkanculakunta on 2/17/16.
 */

import React , { Component } from 'react';
import moment from 'moment';


export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {clock: moment().format("LT"), date: moment().format("ddd,  MMM D")};
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({clock: moment().format("LT"), date: moment().format("ddd,  MMM D")})
        }, 60000);

    }

    render() {
        return (
            <div className="information-panel_clock-container">
                <p className="information-panel_clock-container_clock">{this.state.clock}</p>

                <p className="information-panel_clock-container_date">{this.state.date}</p>
            </div>
        )
    }
}
