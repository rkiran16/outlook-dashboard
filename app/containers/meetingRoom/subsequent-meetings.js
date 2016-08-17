/**
 * Created by rkanculakunta on 2/17/16.
 */

import React,{ Component } from 'react';
import Clock from '../shared/clock';

export default class SubsequentMeetings extends Component {
    render() {
        return (
            <div className="subsequent-meetings">
                <div className="subsequent-meetings_clock">
                    <Clock />
                </div>
                <hr/>
                <div className="subsequent-meetings_headline">
                    <p>upcoming bookings </p>
                </div>
                <hr/>
                <table className="subsequent-meetings_table">
                    <tbody>
                    <tr>
                        <td>Tech Meeting</td>
                        <td>10am - 11am</td>
                        <td className="booked"></td>
                    </tr>

                    <tr>
                        <td>Developer Interview</td>
                        <td>11am - 12pm</td>
                        <td className="booked"></td>
                    </tr>
                    <tr>
                        <td>Available</td>
                        <td>12pm - 1pm</td>
                        <td className="available"></td>
                    </tr>
                    <tr>
                        <td>Available</td>
                        <td>1pm - 2pm</td>
                        <td className="available"></td>
                    </tr>
                    <tr>
                        <td>Creative Regroup</td>
                        <td>2pm - 3pm</td>
                        <td className="booked"></td>
                    </tr>
                    <tr>
                        <td>HR</td>
                        <td>3pm - 4pm</td>
                        <td className="booked"></td>
                    </tr>
                    <tr>
                        <td>Available</td>
                        <td>4pm - 5pm</td>
                        <td className="available"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}