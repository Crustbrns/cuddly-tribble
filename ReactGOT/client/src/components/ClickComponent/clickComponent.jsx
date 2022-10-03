import React, { Component } from "react";
import ReactDOM from "react-dom";
import classes from './clickComponent.module.css';

class ClickComponent extends Component {

    handleClick() {
        console.log('няяянянянняянняя');
    }

    render() {
        return (
            <div className='button' onClick={this.handleClick}>Click</div>
        )
    }
}

export default ClickComponent;