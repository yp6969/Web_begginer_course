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
    console.log(user);
    console.log(allDogs);
    let newI = i;
    for (let x in allDogs.obj) {
      if (allDogs.obj[x]._id === user.obj.dogsList[i]._id) {
        newI = x;
      }
    }
    dispatch(
      postAvilable({ obj: Object.assign(allDogs.obj[newI]), avilable: true })
    );
    dispatch(removeDogAction(i));
    dispatch(removeDogFromDogList({ email: user.obj.email, pos: i }));
    dispatch(setValuesByKey1({ key: newI, value: true }));
  };
  const delAccount = async () => {
    const msse = 'אתה בטוח שאתה קוצה למחוק את החשבון?';
    let del = window.confirm(msse);
    if (del === true) {
      /* for (let x in allDogs.obj) {
        for (let y in user.obj.dogsList) {
          console.log(allDogs.obj[x]._id, user.obj.dogsList[y]._id);
          if (allDogs.obj[x].name === user.obj.dogsList[y].name) {
            console.log(allDogs.obj[x]);
            dispatch(
              postAvilable({
                obj: allDogs.obj[x],
                avilable: true,
              })
            );
            dispatch(setValuesByKey1({ key: x, value: true }));
          }
        }
      }*/
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
      window.location.pathname = '/';
      window.localStorage.url = window.location.pathname;
      setIsDel(false);
    }
  }, [user.obj.email]);
  return (
    <React.Fragment>
      <h2>בית</h2>
      <h3>רשימת אימוץ הכלבים שלי</h3>
      <table className="table">
        <thead className="thead-dark">
          {/* <tr>
            <td>
              <h3>רשימת אימוץ הכלבים שלי</h3>
            </td>
          </tr> */}
          <tr>
            <th>פרטי הכלב</th>
            <th> </th>
            <th> </th>
            <th> </th>
            <th>מייל מאמץ</th>
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
                <td>אין כלבים</td>
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
          סימתי לבחור אפשר למחוק את החשבון
        </button>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};
export default Home;
