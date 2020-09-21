import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { startLogin } from '../../redux/actions/auth';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const initialForm = {
        email: 'emasesosos@gmail.com',
        password: '123456',
    };
    
    const [ formValues, handleInputChange ] = useForm(initialForm);

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(formValues);
        dispatch(startLogin(email, password));
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form
                        onSubmit={ handleLogin }
                    >
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={ email }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={ password }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group btn-auth">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>

                        <Link 
                            // to="/auth/register"
                            to="/register"
                            className="btnSubmit btn-auth"
                        >
                            Crear Nueva Cuenta
                        </Link>

                        <Link 
                            // to="/auth/register"
                            to="/restablish"
                            className="btnSubmit btn-auth mt-3"
                        >
                            ¿Olvidaste tu Contraseña?
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    );
};