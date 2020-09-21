import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import useForm from '../../hooks/useForm';
import { startRestablishPass } from '../../redux/actions/auth';
// import './login.css';

export const ReestablecerContrasena = () => {

    const dispatch = useDispatch();

    const initialForm = {
        email: 'correo@correo.com',
        password1: '123456',
        password2: '123456',
    };
    
    const [ formValues, handleInputChange ] = useForm(initialForm);

    const { email, password1, password2 } = formValues;

    const handleRestablishPass = (e) => {
        e.preventDefault();

        if(password1.length < 6) {
            return Swal.fire('Error', 'La contraseña debe de ser de al menos 6 caracteres', 'error');
        }

        if(password1 !== password2) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }
        // console.log(formValues);
        dispatch(startRestablishPass(email, password1));
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-2">
                    <h3>Restablecer Contraseña</h3>
                    <form
                        onSubmit={ handleRestablishPass }
                    >
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
                                placeholder="Nueva Contraseña" 
                                name="password1"
                                value={ password1 }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la Contraseña" 
                                name="password2"
                                value={ password2 }
                                onChange={ handleInputChange }
                            />
                        </div>

                        <div className="form-group btn-auth">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Cambiar Contraseña" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};
