import React from 'react';
import { Redirect } from 'react-router';

function validateRoute(OriginalComponent) {
    class NewComponent extends React.Component {
        render() {

            if(!localStorage.getItem('uid')) {
                return <Redirect to="/auth/login" />
            }

            return <OriginalComponent />
        }
    }

    return NewComponent;
}

export default validateRoute;