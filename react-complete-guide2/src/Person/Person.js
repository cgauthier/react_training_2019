import React from 'react';
import './Person.css';

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

    return (
        <div className="Person" onClick={props.click}>
            <p>I'm {props.name} and I am {props.age} years old!</p>
            {withChildren}
            <input type="text" onChange={props.change} defaultValue={props.name}/>
        </div>
    )
}


// follows the import/export JS paradigm.
export default person;

// dynamic content wrapped in {}