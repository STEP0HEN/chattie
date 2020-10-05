import React from 'react';
import './Overview.styles.css';
import UserList from '../../containers/UserList/UserList';
import Search from '../Search/Search';

function Overview() {
  return (
    <div className="overview">
      <h3 className="chat-title">Chats</h3>
      <div className="search">
        <Search />
      </div>
      <div className="users-list">
        <UserList />
      </div>

      <div className="btn-and-profile">
        <div className="title-dot">
          <a href="/Overview">Chats</a>
          <span className="chat-dot"> </span>
        </div>

        <div className="title-dot">
          <a href="/profile">Profile</a>
          <span className="chat-dot white-dot"> </span>
        </div>
      </div>
    </div>
  );
}

export default Overview;
