/**
 * Created by rkanculakunta on 2/10/16.
 */

import { FETCH_MEETING_ROOMS } from '../actions/meetingroom-action';


var meeting_room_list = [
    {meetingName: "Room available", location: 'board room', time: '12pm - 1pm', status: 'available'},
    {meetingName: "Tech Department Meeting", location: 'University', time: '2pm - 3pm', status: 'in-use'},
    {meetingName: "Dev Collaboration Meeting", location: '5N-large', time: '3pm - 4pm', status: 'booked'},
    {meetingName: "Creative Briefing", location: '5N-Large', time: '9am - 10am', status: 'booked'},
    {meetingName: "Wednesday Afternoon Open Session", location: '4N-large', time: '1pm - 2pm', status: 'in-use'},
    {meetingName: "Infinite Impact: Drone and Creative Services (Vendor Preso)", location: 'University', time: '2pm - 3pm', status: 'booked'},
    {meetingName: "Tidy Cats Standup", location: '5N-Med', time: '3pm - 4pm', status: 'booked'},
    {meetingName: "Creative Briefing", location: '4N-Large', time: '9am - 10am', status: 'booked'},
    {meetingName: "Room available", location: '4N-med', time: '12pm - 1pm', status: 'available'},
    {meetingName: "Training", location: 'University', time: '2pm - 3pm', status: 'in-use'},
    {meetingName: "Dev Collaboration Meeting", location: 'University', time: '3pm - 4pm', status: 'booked'},
    {meetingName: "Creative Briefing", location: '5N-Large', time: '9am - 10am', status: 'booked'},
    {meetingName: "Room available", location: 'board room', time: '12pm - 1pm', status: 'available'},
    {meetingName: "Tech Department Meeting", location: 'University', time: '2pm - 3pm', status: 'in-use'}
];

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_MEETING_ROOMS :
            console.log(action.payload);
            return [action.payload, ...state];  // [city , city, city] NOT [city , [city,city]]
    }
    return state;
}