// useEffect combines all the lifeCycles of the container/class components
// functional components in React 16.8 should be named using Capitalize name
// the useEffect hook would not work without modifying
// from const cockpit to const Cockpit.

import React,  { useEffect } from 'react';
import classes from './Cockpit.css';

const Cockpit = (props) => {

    useEffect(() => {
        console.log("[Cockpit.js]: useEffect");

        setTimeout(() => {
            alert('Saved data to cloud');
        }, 1000);

        // this will execute when the cockpit is removed
        // think of this as a way to cleanup code 
        // this is a combination of 2 things
        // the empty array
        // this return function
        return () => {
            console.log("[Cockpit.js]: clean up work with useEffect");
        }

    // }, [props.persons]);
    }, []);
    // pass an empty array with no dependencies and it will run only once and never again.
    // if more than one field, then pass an array of them for the same effect

    // can have more than one useEffect
    useEffect(() => {
        console.log("[Cockpit.js]: useEffect");

        setTimeout(() => {
            console.log('Saved data to cloud when props.persons changes');
        }, 1000)

    }, [props.persons]);
    
    // this runs all the time
    useEffect(() => {
        console.log("[Cockpit.js]: useEffect");

        return () => {
            console.log("[Cockpit.js]: clean up work with 2nd useEffect");
        }

    // }, [props.persons]);
    });

    const assignedClasses = [];

    let btnClass = '';
    if(props.showPersons) {
        btnClass = classes.Red;
    }
    if(props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }
    if(props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    } 

    return (
        <div className={classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
          className={btnClass}
          onClick={props.clicked}>Toggle Persons List</button>
        </div>
    );

}

export default Cockpit;