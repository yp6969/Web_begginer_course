import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import NavbarApp from './components/NavbarApp';
import AllRoutes from './pages/routingAppPages';
import { logIn as logInAction } from './redux/userConncection';
function App() {
  const dispatch = useDispatch();

  // check if the user exist in the local storage
  // if exsist update the user to the current
  useEffect(() => {
    if (
      localStorage.getItem('User')
        ? localStorage.getItem('User').length > 50
        : false
    ) {
      const localUser = JSON.parse(localStorage.getItem('User'));
      dispatch(
        logInAction({
          email: localUser.email,
          password: localUser.password,
          dogsList: localUser.dogsList,
        })
      );
    }
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
