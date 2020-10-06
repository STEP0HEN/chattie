import React from 'react';
import './Overview.styles.css';
import UserList from '../../containers/UserList/UserList';
import Search from '../Search/Search';
import { UserContext } from '../../context/userContext';
import FooterChatProfole from '../footerChatProfile/FooterChatProfile';

function Overview() {
  return (
    <UserContext.Consumer>
      {(user) => {
        // eslint-disable-next-line no-console
        console.log(user);

        return (
          <div className="overview">
            <h3 className="chat-title">Chats</h3>

            <div className="search">
              <Search />
            </div>
            <div className="users-list">
              <UserList />
            </div>

            <FooterChatProfole />
          </div>
        );
      }}
    </UserContext.Consumer>
  );
}

export default Overview;
