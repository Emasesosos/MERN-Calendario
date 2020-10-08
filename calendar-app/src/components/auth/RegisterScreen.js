import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useForm from '../../hooks/useForm';
import { startRegister } from '../../redux/actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const initialForm = {
        name: 'Emasesosos',
        email: 'correo@correo.com',
        password1: '123456',
        password2: '123456',
    };
    
    const [ formValues, handleInputChange ] = useForm(initialForm);

    const { name, email, password1, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log(formValues);
        if(password1.length < 6) {
            return Swal.fire('Error', 'La contraseña debe de ser de al menos 6 caracteres', 'error');
        }

        if(password1 !== password2) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }
        // console.log(formValues);
        dispatch(startRegister(name, email, password1));
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form
                        onSubmit={ handleRegister }
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="name"
                                value={ name }
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
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
                                name="password1"
                                value={ password1 }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="password2"
                                value={ password2 }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group btn-auth">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>

                        <Link 
                            // to="/auth/login"
                            to="/login"
                            className="btnSubmit btn-auth"
                        >
                            ¿Ya tienes cuenta?
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    );
};
