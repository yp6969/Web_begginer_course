import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Icon from 'react-bootstrap-icons';
import { logOut, removeDog as removeDogAction } from '../redux/userConncection';
import { removeDogFromDogList } from '../redux/userConncection';
import { postAvilable } from '../redux/allDogs';
import { setValuesByKey1 } from '../redux/allDogs';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allDogs = useSelector((state) => state.allDogs);
  const [isDel, setIsDel] = useState(false);


  const removeDog = (i) => {
    let newI = i;
    let id
    for (let x in allDogs.obj) {
      if (allDogs.obj[x]._id === user.obj.dogsList[i]._id) {
        newI = x;
        id = allDogs.obj[x]._id
      }
    }
    dispatch(
      postAvilable({ obj: Object.assign(allDogs.obj[newI]), avilable: true })
    );
    dispatch(removeDogAction(i));
    dispatch(removeDogFromDogList({ email: user.obj.email, pos: i }));
    dispatch(setValuesByKey1({ key: newI, value: true }));

    
    // update the dog list in the local storage
    let localDogs = JSON.parse(localStorage.getItem('User'));
    console.log("newI = ", newI);
    console.log('localdogs = :', localDogs);

    console.log("length", localDogs.dogsList.length);
    for (let x = 0; x < localDogs.dogsList.length; x++) {
      console.log("x = ", x);
      if (localDogs.dogsList[x]._id === id) {
        console.log(localDogs.dogsList[x]);
        localDogs.dogsList.splice(x, 1);
        localStorage.setItem('User', JSON.stringify(localDogs));
      }
    }
    console.log("finnish for loop");
    console.log('new local dogs = :', localDogs);
    console.log("new local storege", JSON.parse(localStorage.getItem('User')));
  };

  const delAccount = async () => {
    const msse = 'Are you sure you want to delete the account';
    let del = window.confirm(msse);
    if (del === true) {
      try {
        const result = await axios.post('http://localhost:8000/DeleteUser', {
          obj: user.obj,
        });
        const data = result.data;
        localStorage.setItem('User', '');
        dispatch(logOut());
        setIsDel(true);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('not deleted!');
    }
  };

  useEffect(() => {
    if (isDel) {
      window.location.pathname = '/';  // go Home
      window.localStorage.url = window.location.pathname;
      setIsDel(false);
    }
  }, [user.obj.email]);

  return (
    <React.Fragment>
      <h2>Home</h2>
      <h3>My Dog List</h3>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Dog info</th>
            <th> </th>
            <th> </th>
            <th> </th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="row">
            <div className="col">
              {user.obj.dogsList.length > 0 ? (
                user.obj.dogsList.map((x, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <img
                          src={user.obj.dogsList[i].url}
                          alt="Girl in a jacket"
                          width="150"
                          height="200"
                        />
                      </td>
                      <td>
                        <h4>{user.obj.dogsList[i].name}</h4>
                      </td>
                      <td className="">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeDog(i)}
                        >
                          <Icon.XCircle></Icon.XCircle>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td>No dogs to adopt</td>
              )}
            </div>
            <div className="col-2">
              <td>{user.obj.email}</td>
            </div>
          </div>
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {user.obj.email !== '' ? (
        <button className="btn btn-danger" onClick={() => delAccount()}>
          Adopt dogs and delete the User
        </button>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};
export default Home;
