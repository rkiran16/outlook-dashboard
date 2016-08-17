/**
 * Created by rkanculakunta on 2/17/16.
 */

import React, { Component } from 'react';
import ra_logo from '../../assets/images/logo.png';


export default class ResourceLogo extends Component {
    render() {
        return (
            <img className="information-panel__logo" src={ra_logo}/>
        )
    }
}