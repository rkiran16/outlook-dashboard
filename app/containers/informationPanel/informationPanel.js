/**
 * Created by rkanculakunta on 2/7/16.
 */
import React, {Component} from 'react'
import Weather from './weather-list';
import Clock from '../shared/clock';
import ResourceLogo from '../shared/resource_logo';
import io from 'socket.io-client';
const socket = io();


class InformationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {available_room_count: 0, booked_room_count: 0};
    }

    componentDidMount() {
        socket.on('send_count', (data) => {
            console.log(data);
            this.setState({available_room_count: data.available_room_count,booked_room_count:data.booked_room_count});
        })
    }

    render() {
        return (
            <div className="information-panel">
                <div className="information-panel_logo">
                    <ResourceLogo />
                </div>
                <hr/>
                <Clock />
                <hr />
                <div className="information-panel_count">
                    <p>Available Rooms</p>
                    <p className="count available-count">{this.state.available_room_count}</p>
                    <p>Booked Rooms</p>
                    <p className="count booked-count">{this.state.booked_room_count}</p>
                </div>
            </div>
        )
    }
}


export default InformationPanel