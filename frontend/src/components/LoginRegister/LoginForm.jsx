import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authLogin } from '../../apis';
import InterfaceHeader from '../InterfaceHeader';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const Login = async () => {
    try {
      const response = await authLogin(email, password);
      if (response.token != null) {
        localStorage.setItem('userId', email);
        localStorage.setItem('token', response.token);
        props.setToken(response.token);
        console.log(response.token);
        navigate('/');
      } else {
        alert('Fail to login');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <><InterfaceHeader />
    <div className='container mt-5'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email:</label>
            <input type="text" className="form-control" id="emailInput" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="passwordInput" className="form-label">Password:</label>
            <input type="password" className="form-control" id="passwordInput" onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            Don&apos;t have an account? <Link to="/register" className="text-danger">click here to register</Link>
          </div>
          <button onClick={Login} className="btn btn-outline-danger">Submit</button>
          <button onClick={() => navigate('/')} className="btn btn-outline-secondary ms-2">Cancel</button>
        </div>
      </div>
    </div></>
  );
}

export default LoginForm;
