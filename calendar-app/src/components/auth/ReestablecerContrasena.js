import React from 'react';
import './login.css';

export const ReestablecerContrasena = () => {
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-2">
                    <h3>Restablecer Contraseña</h3>
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Nueva Contraseña" 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la Contraseña" 
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
