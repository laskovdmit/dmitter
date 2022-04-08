import React, { Component } from "react";
import styled from 'styled-components';
import nextId from "react-id-generator";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

// import './app.css';
// import style from './App.module.css';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

//расширение AppBlock доп. стилями и запись в StyledAppBlock 
const StyledAppBlock = styled(AppBlock)`
    background-color: inherit;
`;

const SearchSection = styled.div`
    margin: 1rem 0;
    display: flex;

    .search-input {
        width: auto;
        flex-grow: 1;
        margin-right: 3px;
    }
`;

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            incomingData: [
                {label: 'Going to learn React', important: true, like: false, id: 1},
                {label: 'That is so good', important: false, like: false, id: 2},
                {label: 'I need a break...', important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleState = this.onToggleState.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
    }

    //Работаем только с объектами, остальное - игнорируем
    clearData() {
        return this.state.incomingData.filter(obj => {
            if (obj instanceof Object && obj.__proto__.__proto__ === null) {
                return true;
            } else {
                return false;
            }
        });
    }

    deleteItem(id) {
        this.setState(({incomingData}) => {
            const index = incomingData.findIndex(elem => elem.id === id);
            
            const before = incomingData.slice(0, index);
            const after = incomingData.slice(index + 1);

            const newArr = [...before, ...after];

            return {
                incomingData: newArr
            }
        });
    }

    addItem(body) {

        const newItem = {
            label: body,
            important: false,
            id: nextId()
        }

        this.setState(({incomingData}) => {
            const newArr = [...incomingData, newItem];
            return {
                incomingData: newArr
            }
        });
    }

    onToggleState(id, event) {
        this.setState(({incomingData}) => {
            const index = incomingData.findIndex(elem => elem.id === id);

            const old = incomingData[index];
            let newItem = {...old};

            switch (event) {
                case 'important':
                    newItem.important = !old.important;
                    break;
                case 'like':
                    newItem.like = !old.like;
                    break;
                default:
                    break;
            }

            const newArr = [...incomingData.slice(0, index), newItem, ...incomingData.slice(index + 1)];

            return {
                incomingData: newArr
            }
        });
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }


        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        this.clearData();
        const {incomingData, term, filter} = this.state;

        const liked = incomingData.filter(item => item.like).length;
        const allPosts = incomingData.length;

        const visiblePosts = this.filterPost(this.searchPost(incomingData, term) , filter);

        return (
            <StyledAppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <SearchSection>
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </SearchSection>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleState={this.onToggleState} />
                <PostAddForm
                    onAdd={this.addItem}/>
            </StyledAppBlock>
        )
    }
};