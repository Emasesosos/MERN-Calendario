import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { ReestablecerContrasena } from '../components/auth/ReestablecerContrasena';
import { RegisterScreen } from '../components/auth/RegisterScreen';


export const AuthRouter = () => {
    return (
        <div className="">
            <div className="">
                <Switch>

                    <Route 
                        exact 
                        path="/auth/login"
                        component={ LoginScreen }
                    />

                    <Route 
                        exact 
                        path="/auth/register"
                        component={ RegisterScreen }
                    />

                    <Route 
                        exact 
                        path="/auth/restablish"
                        component={ ReestablecerContrasena }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </div>
    );
};
