import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
// import { PublicRoute } from './PublicRoute';
// import { PrivateRoute } from './PrivateRoute';
// import { AuthRouter } from './AuthRouter';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { LoginScreen } from '../components/auth/LoginScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>

                    <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/register" component={ RegisterScreen } />
                    <Route exact path="/" component={ CalendarScreen } />
                    <Redirect to="/" />

                    {/*
                        <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter }
                        // isAuthenticated={ isLoggedIn }
                        />
                        
                        <PrivateRoute 
                            exact
                            path="/" 
                            component={ CalendarScreen }
                            // isAuthenticated={ isLoggedIn }
                        />

                        <Redirect to="/auth/login" />
                    */}
                    
                </Switch>
            </div>
        </Router>
    );
};
