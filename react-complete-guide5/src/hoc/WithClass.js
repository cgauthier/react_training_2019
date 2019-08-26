import React from 'react';

// simple HOC
// use this form when you only care about styling, but no behind the scene logic
// const WithClass = (props) => {

//     return (
//         <div className={props.classes}>
//             {props.children}
//         </div>    
//     );

// };

// complex HOC
// will be using Auxiliary to provide link
// use this form when you need behind the scene logic
const withClass = (WrappedComponent, className) => {

    return (props) => {

        return (
            <div className={className} >
                <WrappedComponent />
            </div>
        )
    };

};

export default withClass;


// note: avoiding the shortform versions of the ES6 arrow operator syntax to help keep the examples clear