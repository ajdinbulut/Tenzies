import React from "react";
export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div onClick={props.held} className="die--div" style={styles}>
            <h2>{props.value}</h2>
        </div>
    )
}