import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { store } from '../../redux/store/store';
import { setReply } from '../../redux/reducer/commentReducer';
import Form_Comment from '../Form_Comment/Form_Comment';

function Comments({ reply, item, article_id }) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        store.dispatch(setReply({
            reply: !reply
        }))

        setClicked(!clicked);
    }
    return(
        <div className="box-comments">
            <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mark_Zuckerberg_F8_2018_Keynote_%28cropped%29.jpg/1200px-Mark_Zuckerberg_F8_2018_Keynote_%28cropped%29.jpg" />
            <div className="box-content-comments">
                <span className="comments-username">
                    {item.username}
                    <span className="comments-date">{moment(item.created_at).fromNow()}</span>
                </span>
                <span className="comments-text">{item.comment}</span>
                <a onClick={handleClick} className="comments-reply" id={item.id}>
                    Reply {reply}
                </a>
                {
                    clicked ? <Form_Comment article_id={article_id} parent_id={item.id} /> : ''
                }
                {item.child && item.child.map((item, key) => (
                    <Comments key={key} item={item} reply={true} article_id={article_id}/>
                ))}
            </div>
        </div>
    )
}

const reduxState = (state) => ({
    isLoading: state.comment.isLoading,
    reply: state.comment.reply
})

const reduxDispatch = (dispatch) => ({

})

export default connect(reduxState, reduxDispatch)(withRouter(Comments));

