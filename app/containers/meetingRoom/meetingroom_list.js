/**
 * Created by rkanculakunta on 2/10/16.
 */

import React, { Component } from 'react';
import AlarmClock from '../../assets/images/alarm-clock.png';
import io from 'socket.io-client';
import { Link } from 'react-router';
import { DETAILS_ROUTE } from '../../routes.js';
import $ from 'jquery';
import moment from 'moment';
import sortTest from '../../assets/lib/sort-animation.js';
const socket = io();


export default class MeetingRoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {meeting_rooms: []};
    }

    componentDidMount() {
        socket.on('send_data', (data) => {
            console.log('triggered');
            this.setState({meeting_rooms: data});
        })
    }

    componentDidUpdate() {
        setTimeout(() => {
            sortTest();
            console.log('updated');
        },1000)
    }

    render() {
        return (
            <div className="meeting-room-panel">
                <div className="meeting-room-panel_headline">
                    <img src={AlarmClock}/>
                    <p>today's events</p>
                </div>
                <table id="meeting-room-table" className="meeting-room-panel_meeting-table">
                    <thead>
                    <tr>
                        <th id="position" className="hidden anim:update anim:number">Position</th>
                        <th id="score" className="hidden anim:id">Score</th>
                        <th id="name" className="hidden  anim:update anim:sort anim:number">Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.meeting_rooms.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.location}</td>
                            <td>{item.startTime} - {item.endTime}</td>
                            <td className="status">
                                <aside className={item.status + " " + "sheer-button"}>
                                    <span>{item.status}</span>
                                </aside>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}
