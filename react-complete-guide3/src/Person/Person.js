import React from 'react';
import './Person.css';
import Radium from 'radium';

// one way
// function person() {
//     return (
//         // some JSX
//     )
// }

// es6 way using arrow function 

const person = (props) => {
    
    // const generateNum = () => Math.floor(Math.random() * 30);    

    // a way of dealing with conditional output
    // basically, we don't want to create any more content in the DOM than required
    // anything inside 'tags' are props.children
    const withChildren = (props.children) ? <p>{props.children}</p> : null;

    // Radium
    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    }

    return (
        <div className="Person" onClick={props.click} style={style}>
            <p>I'm {props.name} and I am {props.age} years old!</p>
            {withChildren}
            <input type="text" onChange={props.changed} defaultValue={props.name}/>
        </div>
    )
}


// follows the import/export JS paradigm.
export default Radium(person);

// dynamic content wrapped in {}