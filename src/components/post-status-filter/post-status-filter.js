import React, {Component} from "react";
import { Button, ButtonGroup } from 'reactstrap'; //bootstrap в React

// import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'}
        ];
    }

    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {filter, onFilterSelect} = this.props;
            const active = filter === name;
            const clazz = active ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button
                    key={name}
                    type="button"
                    className={`btn ${clazz}`}
                    onClick={() => onFilterSelect(name)}>
                    {label}</button>
            )
        });

        return (
            <ButtonGroup>
                {/*bootstrap в React
                <Button color="info">Все</Button> */}
                {buttons}
            </ButtonGroup>
        )
    }
};