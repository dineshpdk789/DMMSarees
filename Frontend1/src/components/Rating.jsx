import React, { useState } from 'react'

const Rating = ({ value, onRatingChange, disabled }) => {
    


    return (
        <div>
            <div className="rating">⭐</div>
        </div>
    )
}

export default Rating























// const [hoverRating, setHoveredRating] = useState(0);
    // const [selectrating, setselectrating] = useState(value || 0);

    // //handle star hover
    // const handleMouseEnter = (rating) => {
    //     if (!disabled) {
    //         setHoveredRating(rating);
    //     }
    // }
    // //mouse leave
    // const handleMouseLeave = () => {
    //     if (!disabled) {
    //         setHoveredRating(0);
    //     }
    // }
    // //handle click
    // const handleClick=(rating)=>{
    //     if (!disabled) {
    //         setHoveredRating(rating);
    //         if(onRatingChange){
    //             onRatingChange(rating)
    //         }
    //     }
    // }
    // //function to generate stars