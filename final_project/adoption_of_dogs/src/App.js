import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import NavbarApp from './components/NavbarApp';
import AllRoutes from './pages/routingAppPages';
import { postAllDogs as postAllDogsThunk } from './redux/allDogs';
import { logIn as logInAction } from './redux/userConncection';
function App() {
  const dispatch = useDispatch();
 const allDogs =useSelector((state)=> state.allDogs)
  // check if the user exist in the local storage
  // if exsist update the user to the current
  useEffect(() => {
    if (
      localStorage.getItem('User')
        ? localStorage.getItem('User').length > 50
        : false
    ) {
      console.log("{{{{{{{{{{{{{{{{");
      const localUser = JSON.parse(localStorage.getItem('User'));
      console.log(localUser);
      dispatch(
        logInAction({
          email: localUser.email,
          password: localUser.password,
          dogsList: localUser.dogsList,
        })
      );
    }
  }, []);
  useEffect(() => {
        if (allDogs.obj.length === 0) dispatch(postAllDogsThunk());
  }, []);
  return (
    <div className="App">
      <div className="navbar">
        <NavbarApp />
      </div>
      <div className="bodyApp">
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
