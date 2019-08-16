import React from 'react';
import Person from './Person/Person';

const persons = (props) => {

    return (
        props.persons.map((person, index) => {
            if(person.children) {
              return <Person 
                key={person.id}  
                click={(event) => props.clicked(event, index)}
                name={person.name} 
                changed={(event) => props.changed(event, person)}
                age={person.age}>{person.children}</Person>
            } else {
              return <Person 
                key={person.id}  
                click={(event) => props.clicked(event, index)}
                changed={(event) => props.changed(event, person)}
                name={person.name} 
                age={person.age}/>
            }
          })
    );

}

export default persons;