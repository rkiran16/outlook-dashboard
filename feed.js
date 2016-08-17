var ews = require('ews-javascript-api');
var moment = require('moment');

//****************************************************************/
//********************* VARIABLES ********************************/
//****************************************************************/
const AVAILABLE_ROOM = 'available';
const BOOKED_ROOM = 'booked';
const exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2010);
const timeWindow = new ews.TimeWindow(ews.DateTime.Now, new ews.DateTime(ews.DateTime.Now.TotalMilliSeconds + ews.TimeSpan.FromHours(24).asMilliseconds()));
const options = new ews.AvailabilityOptions();
const startDay = moment(800, 'hmm'); //8:00 AM
const endDay = moment(1730, 'hmm'); // 5:30 PM
const attendee = [
    new ews.AttendeeInfo("CRCOL-5N-lg@resourceammirati.com"),
    new ews.AttendeeInfo("CRCOL-5N-hive@resourceammirati.com"),
    new ews.AttendeeInfo("CRCOL-5N-med@resourceammirati.com"),
    new ews.AttendeeInfo("CRCOL-5N-sm@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-4n-bizdev@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-4n-hr@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-4n-lg@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-4n-med@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-4s-lg@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-4s-med@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-4s-sm@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-5s-university@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-bunkereast@resourceammirati.com"),
    new ews.AttendeeInfo("crcol-bunkerwest@resourceammirati.com")
];


exch.Credentials = new ews.ExchangeCredentials(process.env.exchange_username, process.env.exchange_password);
exch.Url = new ews.Uri("https://colarnexch02.resource.com/ews/exchange.asmx");
options.requestedFreeBusyView = ews.FreeBusyViewType.Detailed;


var exchange_data;
var available_data;
var actual_data;
var available_count;
var booked_count;
var previous_end_time;
var meeting_room;

//****************************************************************/
//********************* INTERNAL FUNCTIONS ***********************/
//****************************************************************/
function getMeetingRoomNames(index) {

    switch(index) {
        case 0:
            return "CRCOL-5N-lg";
            break;
        case 1:
            return "CRCOL-5N-hive";
            break;
        case 2:
            return "CRCOL-5N-med";
            break;
        case 3:
            return "CRCOL-5N-sm";
            break;
        case 4:
            return "crcol-4n-bizdev";
            break;
        case 5:
            return "crcol-4n-hr";
            break;
        case 6:
            return "crcol-4n-lg";
            break;
        case 7:
            return "crcol-4n-med";
            break;
        case 8:
            return "crcol-4s-lg";
            break;
        case 9:
            return "crcol-4s-med";
            break;
        case 10:
            return "crcol-4s-sm";
            break;
        case 11:
            return "crcol-5s-university";
            break;
        case 12:
            return "crcol-bunkereast";
            break;
        case 13:
            return "crcol-bunkerwest";
            break;

    }
}
function getUserAvailability(socket) {
    exch.GetUserAvailability(attendee, timeWindow, ews.AvailabilityData.FreeBusy, options)
        .then(function (availabilityResponse) {
            exchange_data = [];
            actual_data = [];
            available_count = 0;
            booked_count = 0;
            availabilityResponse.AttendeesAvailability.responses.map(function (value, index) {
                available_data = [];
                previous_end_time = '';
                value.calendarEvents.map(function (item, item_index)
                {
                    if (item_index == 0) {
                        if ((moment(startDay).diff(item.startTime.momentDate)) != 0)
                        {
                            meeting_room = {
                                details : {
                                    location: ''
                                },
                                startTime : {
                                    momentDate: ''
                                },
                                endTime : {
                                    momentDate: ''
                                },
                                freeBusyStatus: ''
                            };
                            meeting_room.details.location = item.details.location;
                            meeting_room.startTime.momentDate = startDay;
                            meeting_room.endTime.momentDate = moment(item.startTime.momentDate);
                            meeting_room.freeBusyStatus = 0;
                            previous_end_time = moment(item.endTime.momentDate);
                            available_data.push(meeting_room);
                        }
                    } else if ((previous_end_time != '') && (moment(item.startTime.momentDate).diff(previous_end_time) != 0))
                    {
                        meeting_room = {
                            details : {
                                location: ''
                            },
                            startTime : {
                                momentDate: ''
                            },
                            endTime : {
                                momentDate: ''
                            },
                            freeBusyStatus: ''
                        };
                        meeting_room.details.location = item.details.location;
                        meeting_room.startTime.momentDate = previous_end_time;
                        meeting_room.endTime.momentDate = moment(item.startTime.momentDate);
                        meeting_room.freeBusyStatus = 0;
                        previous_end_time = moment(item.endTime.momentDate);
                        available_data.push(meeting_room);
                    } else if (item_index == (value.calendarEvents.length - 1))
                    {
                        if (moment(item.endTime.momentDate).diff(endDay) != 0)
                        {
                            meeting_room = {
                                details : {
                                    location: ''
                                },
                                startTime : {
                                    momentDate: ''
                                },
                                endTime : {
                                    momentDate: ''
                                },
                                freeBusyStatus: ''
                            };
                            meeting_room.details.location = item.details.location;
                            meeting_room.startTime.momentDate = moment(item.endTime.momentDate);
                            meeting_room.endTime.momentDate = endDay;
                            meeting_room.freeBusyStatus = 0;
                            previous_end_time = '';
                            available_data.push(meeting_room);
                        }
                    } else if ((previous_end_time != '') && (moment(item.startTime.momentDate).diff(previous_end_time) == 0))
                    {
                        previous_end_time = moment(item.endTime.momentDate)
                    }
                });

                exchange_data.push(value.calendarEvents.concat(available_data));
            });
            // Now Filter all the rooms at current moment.
            exchange_data.map(function (value,index) {
                value.map(function (item) {
                    if ((moment(item.startTime.momentDate).isSameOrBefore(moment())) && (moment(item.endTime.momentDate).isSameOrAfter(moment()))) {
                        var obj = {};
                        obj.startTime = moment(item.startTime.momentDate).format('LT');
                        obj.endTime = moment(item.endTime.momentDate).format('LT');
                        obj.location = getMeetingRoomNames(index);

                        if (item.freeBusyStatus == 0) {
                            available_count += 1;
                            obj.status = AVAILABLE_ROOM;
                        } else {
                            booked_count += 1;
                            obj.status = BOOKED_ROOM;
                        }
                        actual_data.push(obj);
                    }
                });
            });
            socket.emit('send_data', actual_data);
            socket.emit('send_count', {available_room_count: available_count, booked_room_count: booked_count})
        });
}


//****************************************************************/
//********************* GLOBAL FUNCTIONS *************************/
//****************************************************************/

function start(socket) {
    getUserAvailability(socket);
}

exports.start = start;
