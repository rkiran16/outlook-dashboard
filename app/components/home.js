/**
 * Created by rkanculakunta on 2/17/16.
 */
import React ,{ Component } from 'react';
import InformationPanel from '../containers/informationPanel/informationPanel';
import MeetingRoomList from '../containers/meetingRoom/meetingroom_list'

export default class Home extends Component {
    render() {
        return (
            <div className="main-container">
                <InformationPanel />
                <MeetingRoomList />
            </div>
        );
    }
}