import React from "react";
import styled from 'styled-components';

import PostListItem from '../post-list-item';
import { ListGroup } from 'reactstrap';
// import './post-list.css';

const StyledListGroup = styled(ListGroup)`
    margin-top: 50px;

    .list-group-item {
        padding: 20px 35px 10px 35px;
        margin-top: 10px;
    }
`;

const PostList = ({posts, onDelete, onToggleState}) => { //or props.posts
    const elements = posts.map(item => {
        const {id, ...itemProps} = item;
        return (
            //key - уникальный ключ, который должен быть у каждого элемента. Для перерисовки каждого элемента, если будут приходить новые в posts
            <li key={id} className="list-group-item">
                <PostListItem
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleState={(event) => onToggleState(id, event)} />
            </li>
        )
    });

    return (
        <StyledListGroup>
            {elements}
        </StyledListGroup>
    )
};

export default PostList;