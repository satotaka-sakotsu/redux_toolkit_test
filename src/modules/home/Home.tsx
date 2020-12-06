import React from 'react';
import logo from "../../logo.svg";
import {useHistory} from "react-router";
import '../../App.css';

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />

      <ul className='link-list'>
        <li className='link-item'>
          <button
            className='btn'
            onClick={() => history.push('/counter')}
          >Counter App</button>
        </li>
        <li className='link-item'>
          <button
            className='btn'
            onClick={() => history.push('/todo')}
          >Todo App</button>
        </li>
      </ul>
    </div>
  );
};

export default Home;
