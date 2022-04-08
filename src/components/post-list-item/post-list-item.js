import React, {Component} from "react";
import styled from 'styled-components';

// import './post-list-item.scss';

const AppListItem = styled.div`
    font-size: 1.25rem;
    display: flex;
    justify-content: space-between;

    button {
        width: 35px;
        height: 35px;
        margin: 3px;
        font-size: 17px;
        border: none;
        cursor: pointer;
    }

    button:focus {
        box-shadow: none;
        outline: none;
    }

    .btn-star {
        color: ${props => props.important ? '#aeaeae' : '#FFD700'};
    }

    .btn-trash {
        color: red;
    }

    .fa-heart {
        width: 35px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        font-size: 16px;
        color: red;
        transition: 0.3s all;
        transform: ${props => props.like ? 'translateX(0px)' : 'translateX(30px)'};
        opacity: ${props => props.like ? '1' : '0'};
    }
`;

const AppListItemLabel = styled.div`
    display: block;
    line-height: 35px;
    cursor: pointer;
    user-select: none;
    transition: 0.5s all;
    color: ${props => props.important ? '#FFD700' : 'inherit'};
`;

export default class PostListItem extends Component {
    //Записывая компонент в виде функции мы не сможем хранить состояние. Для этого нужна запись в виде класса
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         important: false,
    //         like: false
    //     }
    //     //1 способ привязки this
    //     this.onImportant = () => {
    //         this.setState((state) => ({
    //             important: !state.important
    //         }));
    //     };
    //     //2 способ привязки this
    //     this.onLike = this.onLike.bind(this);
    // }
    // onLike() {
    //     // this.state.like напрямую менять нельзя. Только через setState
    //     /*  this.setState(state => {
    //             years: ++state.years 
    //         });
    //     */
    //     this.setState((state) => ({ // ({}) нужно для jsx 
    //         like: !state.like
    //     }));
    // }
    //3 способ привязки this (экспериментальный)
    // onImportant = () => {
    //     this.setState((state) => ({
    //         important: !state.important
    //     }));
    // };

    render() {
        const {label, onDelete, onToggleState, important, like} = this.props;

        return (
            <AppListItem important={important} like={like}>
                <AppListItemLabel important={important}
                    onClick={() => onToggleState('like')}>
                    {label}
                </AppListItemLabel>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="btn-star btn-sm"
                        onClick={() => onToggleState('important')}>
                        <i className="fa fa-star"></i>
                    </button>
                    <button
                        type="button"
                        className="btn-trash btn-sm"
                        onClick={onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </AppListItem>
        )
    }
}