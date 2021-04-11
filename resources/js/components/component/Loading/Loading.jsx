import React from 'react'
import './loading.css';

function Loading() {
    return (
        <div className="page-loading">
            <div className="loading">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}

export default Loading
