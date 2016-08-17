/**
 * Created by rkanculakunta on 2/10/16.
 */
export const FETCH_MEETING_ROOMS = 'FETCH_MEETING_ROOMS';
import io from 'socket.io-client';
import Q from 'q';
const socket = io();

var EmitPromise = function( socket, command) {
    var deferred = Q.defer();
    socket.on(command, function( response ) {
        if( typeof response === "object" ) {
            deferred.resolve(response);
            console.log(response);
        } else {
            deferred.reject( "The response to your request could not be parsed." );
        }
    });
    return deferred.promise.timeout( 30000, "The request took too long to respond." );
};


export function fetchMeetingRooms() {

    const meeting_room_list = EmitPromise(socket,'data_update');
    return {
        type: FETCH_MEETING_ROOMS,
        payload: meeting_room_list
    }
}
