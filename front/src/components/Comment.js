import React from 'react'
import userPhoto from '../assets/user_profile/man.jpg'

 const Comment = () => {
    return (
        <section className="comment">
            <div className="comment__content">
                <p className="comment__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor soluta, eaque doloremque sunt similique sit totam aliquam? Placeat!</p>
                <img className="comment__image" src={userPhoto} alt=""/>
                <h6 className="comment__username">Paul Lagay</h6>
                <span className="comment__userjob">CEO de BNP</span>
            </div>
        </section>
    )
}

export default Comment