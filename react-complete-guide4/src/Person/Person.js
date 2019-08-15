import React from 'react';
import './Person.css';
import cls from './Person.css';

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

    // testing as part of dealing with React JS 16.+ Error Boundaries
    const rnd = Math.random();

    if(rnd > 0.7) {
        throw new Error("Something is not working anymore...");
    }

    return (
        <div className={cls.Person} onClick={props.click}>
            <p>I'm {props.name} and I am {props.age} years old!</p>
            {withChildren}
            <input type="text" onChange={props.changed} defaultValue={props.name}/>
        </div>
    )
}


// follows the import/export JS paradigm.
export default person;

// dynamic content wrapped in {}