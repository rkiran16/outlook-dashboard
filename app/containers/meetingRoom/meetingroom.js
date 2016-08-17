/**
 * Created by rkanculakunta on 2/10/16.
 */

import React,{ Component } from 'react';
import SubsequentMeetings from './subsequent-meetings';
import CurrentMeeting from './current-meeting';


class MeetingRoom extends Component {
    render() {
        return (
            <div className="meeting-room">
                <SubsequentMeetings />
                <CurrentMeeting />
            </div>
        )
    }
}


export default MeetingRoom;