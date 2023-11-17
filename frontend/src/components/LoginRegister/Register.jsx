import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authRegister } from '../../apis';
import InterfaceHeader from '../InterfaceHeader';

const RegisterForm = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const Register = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      const response = await authRegister(email, password, name);
      console.log(response);
      if (response.token != null) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', email);
        props.setToken(response.token);
        alert('Register success');
        navigate('/');
      } else {
        alert(response.message || 'Fail to register');
      }
    } catch (error) {
      alert('register err: ', error);
      alert(error);
    }
  };

  return (
    <><InterfaceHeader />
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email:</label>
            <input type="text" className="form-control" id="emailInput" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">Name:</label>
            <input type="text" className="form-control" id="nameInput" onChange={e => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Password:</label>
            <input type="password" className="form-control" id="passwordInput" onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password:</label>
            <input type="password" className="form-control" id="confirmPasswordInput" onChange={e => setConfirmPassword(e.target.value)} />
          </div>
          <button onClick={Register} className="btn btn-outline-danger">Submit</button>
          <button onClick={() => navigate('/')} className="btn btn-outline-secondary ms-2">Cancel</button>
        </div>
      </div>
    </div></>
  );
}

export default RegisterForm;
