/**
 * Created by rkanculakunta on 2/17/16.
 */

import React,{ Component } from 'react';


export default class CurrentMeeting extends Component {
    render() {
        return (
            <div className="current-meeting-box">
                <div className="current-meeting-box_headline">
                    <div className="current-meeting-box_headline_in-use"></div>
                    <p>University</p>
                </div>
                <hr/>
                <div className="current-meeting-box_info">
                    <p>In progress</p>
                    <div className="current-meeting-box_info_meeting">
                        <p>Tech monthly dept meeting</p>
                        <p>9am - 10am</p>
                    </div>
                    <p className="current-meeting-box_info_host">Host: Kat Fulton</p>
                </div>
            </div>
        )
    }
}