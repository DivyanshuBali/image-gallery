import React from 'react';
 
const option = (props) => {
    return(
        <option {...props}> {props.value} </option>
    )
}
 
export default option;