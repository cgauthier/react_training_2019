import React from 'react';
import './Person.css';
import cls from './Person.css';

const person = (props) => {
    
    console.log('[Person.js]: rendering...');
    const withChildren = (props.children) ? <p>{props.children}</p> : null;

    return (
        <div className={cls.Person} onClick={props.click}>
            <p>I'm {props.name} and I am {props.age} years old!</p>
            {withChildren}
            <input type="text" onChange={props.changed} defaultValue={props.name}/>
        </div>
    )
}

export default person;