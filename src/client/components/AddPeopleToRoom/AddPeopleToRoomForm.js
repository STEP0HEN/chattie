import React from 'react';
import './AddPeopleToRoom.css';
import PropTypes from 'prop-types';
import DisplayUserInGroup from './DisplayUserInGroup';
import DiplayListOFUsers from './DiplayListOFUsers';

export default function AddPeopleToRoom({
  onRemoveFromGroup,
  users,
  input,
  renderUserInGroup,
  addedUsers,
  onSearch,
  onNext,
}) {
  return (
    <div className="container">
      <div className="header">
        <div className="list-name">
          <div>click on + to add people in room</div>
          <div>
            <span>
              {addedUsers.length}/{users.length}
            </span>
          </div>
        </div>
      </div>

      <div className="input-search">
        <input type="text" placeholder="Search for user" onChange={onSearch} />
        <button type="button" className="next-button" onClick={onNext}>
          Next
        </button>
      </div>

      <div className="add-people">
        <DisplayUserInGroup
          addedUsers={addedUsers}
          onRemoveFromGroup={(id) => onRemoveFromGroup(id)}
        />
      </div>
      <div className="list-people">
        <DiplayListOFUsers
          users={users}
          input={input}
          renderUserInGroup={(id) => renderUserInGroup(id)}
        />
      </div>
    </div>
  );
}

AddPeopleToRoom.propTypes = {
  onRemoveFromGroup: PropTypes.func.isRequired,
  addedUsers: PropTypes.arrayOf(Object).isRequired,
  users: PropTypes.arrayOf(Object).isRequired,
  renderUserInGroup: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
};