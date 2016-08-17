import React ,{ Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}


// {this.props.children}  renders all the views