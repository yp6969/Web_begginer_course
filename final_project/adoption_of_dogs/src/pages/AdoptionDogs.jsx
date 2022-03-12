import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postAllDogs as postAllDogsThunk } from '../redux/allDogs';
import { postAvilable } from '../redux/allDogs';
import { setValuesByKey1 } from '../redux/allDogs';
import { addDog } from '../redux/userConncection';
import { updateDogsList } from '../redux/userConncection';

const AdoptionDogs = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const user = useSelector((state) => state.user);

  const [isAvilable, setIsAvilable] = useState(true);

  // add dog to the user
  const adoption = (index) => {
    console.log(allDogs.obj[index]);
    dispatch(
      updateDogsList({
        email: user.obj.email,
        dog: Object.assign(allDogs.obj[index]),
      })
    );
    dispatch(addDog(Object.assign(allDogs.obj[index])));
    let localDogs = JSON.parse(localStorage.getItem('User'));
    localDogs.dogsList.push(Object.assign(allDogs.obj[index]));
    localStorage.setItem('User', JSON.stringify(localDogs));
    dispatch(setValuesByKey1({ key: index, value: false }));
    dispatch(postAvilable({ obj: allDogs.obj[index], avilable: false }));
  };
  useEffect(() => {
    if (allDogs.obj.length === 0) dispatch(postAllDogsThunk());
  }, []);
  return (
    <React.Fragment>
      {allDogs.obj.map((x, index) => {
        return (
          <div className="container" key={index}>

            <div class="card">
              <img 
              src={allDogs.obj[index].url}
              class={"card-img-top"}
              alt="Girl in a jacket"
              width="250"
              height="300"/>
              <div class="card-body">
                <h5 class="card-title">{allDogs.obj[index].name}</h5>
                <p class="card-text">{allDogs.obj[index].description}</p>
                &ensp;&ensp;&ensp;&ensp;
                <h4>Need to adopt: {allDogs.obj[index].avilable ? 'Yes' : 'Not avalible'}</h4>
                <button
                  className="btn btn-primary"
                  disabled={
                    user.obj.email !== '' ? !allDogs.obj[index].avilable : true
                  }
                  onClick={() => adoption(index)}
                >
                  Adopt
                </button>
              </div>
            </div><br></br>


            
            {/* <img
              src={allDogs.obj[index].url}
              alt="Girl in a jacket"
              width="250"
              height="300"
            />
            <h4>Name: {allDogs.obj[index].name}</h4>
            <p className="details">
              <h4>Dog information</h4>
              <p>{allDogs.obj[index].description}</p>
            </p>
            &ensp;&ensp;&ensp;&ensp;
            <h4>Need to adopt:{allDogs.obj[index].avilable ? 'Yes' : 'Not avalible'}</h4>
            <button
              className="btn btn-primary"
              disabled={
                user.obj.email !== '' ? !allDogs.obj[index].avilable : true
              }
              onClick={() => adoption(index)}
            >
              Adopt
            </button>
            <div></div><br></br> */}
          </div>
        );
      })}
    </React.Fragment>
  );
};
export default AdoptionDogs;
