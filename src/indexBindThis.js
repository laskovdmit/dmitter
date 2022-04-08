import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/app/';

class WhoAmI extends Component {
    constructor (props) {
        super(props);
        this.state = {
            years: 26
        };
        this.nextYear = this.nextYear.bind(this);
        // this.nextYear = () => {
        //     this.setState(state => ({
        //         years: ++state.years
        //     }));
        // }
    }

    nextYear() {
        this.setState(state => ({
            years: ++state.years
        }));
    }

    // nextYear = () => {
    //     this.setState(state => ({
    //         years: ++state.years
    //     }));
    // }

    render() {
        const {name, surname, link} = this.props;
        const {years} = this.state;

        return (
            // or React.Fragment
            <> 
                <button onClick={this.nextYear}>++</button>
                <h1>My name is {name}, surname - {surname}, years {years}</h1>
                <a href={link}>My profile</a>
            </>
        )
    }
}

const All = () => {
    return (
        <>
            <WhoAmI name="John" surname="Smith" link="vk.com" />
            <WhoAmI name="Ivan" surname="Smith" link="my.com" />
            <WhoAmI name="Alex" surname="Shepard" link="facebook.com" />
        </>
    )
};

ReactDOM.render(<All/> ,document.getElementById('root'));