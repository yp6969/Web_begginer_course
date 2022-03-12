import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const CreateUser = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let i = 0;
  const he = ['מייל', 'סיסמה', 'אישור סיסמה'];
  let s = 0;
  const showMessage = (err) => {
    return (
      <div className="col-4">
        <div className="alert alert-warning">
          <strong>{he[i - 1]}!</strong>
          <a href="#" className="alert-link">
            {err}
          </a>
        </div>
      </div>
    );
  };
  const createUser = async (email, password) => {
    const result = await axios.post('http://localhost:8000/CreateUser', {
      type: 'User',
      user: {
        email: email,
        password: password,
        dogsList: [],
      },
    });

    return result.data;
  };
  const onSubmit = (data) => {
    if (data.password !== data.password1) {
      alert('passwords are not equal');
    } else {
      let result = createUser(data.email, data.password);
      if (result) {
        result.then((result) => {
          console.log(result);
          if (result.mess === 'alredy exist!') {
            alert('user alredy exist!!');
          } else {
            alert('user created!!');
            window.location.pathname = '/Login';
            window.localStorage.url = window.location.pathname;
          }
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div>
                <label htmlFor="email">Email</label> <br />
                <input placeholder='Email'
                  {...register('email', { required: 'email is require!' })}
                  type="email"
                  name="email"
                  id="email"
                ></input>
              </div>
              <div>
                <label htmlFor="password">Password</label> <br />
                <input placeholder='Password'
                  {...register('password', { required: 'email is require!' })}
                  type="password"
                  name="password"
                  id="password"
                ></input>
              </div>
              <div>
                <label htmlFor="password1">Accept Password</label> <br />
                <input placeholder='Accept Password'
                  {...register('password1', { required: 'email is require!' })}
                  type="password"
                  name="password1"
                  id="password1"
                ></input>
              </div>
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
