import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    // Route,
    Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AuthRouter } from './AuthRouter';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
// import { RegisterScreen } from '../components/auth/RegisterScreen';
// import { LoginScreen } from '../components/auth/LoginScreen';
// import { ReestablecerContrasena } from '../components/auth/ReestablecerContrasena';
import { startChecking } from '../redux/actions/auth';
import { Spinner } from '../components/loading/Spinner';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid }= useSelector(state => state.auth);

    // console.log(checking);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if(checking) {
        return (<Spinner />);
    }

    return (
        <Router>
            <div>
                <Switch>

                    {/*
                        <Route exact path="/login" component={ LoginScreen } />
                        <Route exact path="/register" component={ RegisterScreen } />
                        <Route exact path="/restablish" component={ ReestablecerContrasena } />
                        <Route exact path="/" component={ CalendarScreen } />
                        <Redirect to="/" />
                    */}
                    
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter }
                        isAuthenticated={ !!uid }
                    />
                    
                    <PrivateRoute 
                        exact
                        path="/" 
                        component={ CalendarScreen }
                        isAuthenticated={ !!uid }
                    />

                    <Redirect to="/auth/login" />             
                    
                </Switch>
            </div>
        </Router>
    );
};
