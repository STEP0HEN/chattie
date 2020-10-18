import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import LastMessagesList from '../../components/LastMessageList/LastMessagesList';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/ErrorComponent/Error';

const LastChannelsMessageList = ({ userId }) => {
  const history = useHistory();
  const url = `/api/channels-message/last-messages?userId=${userId}`;
  const { response, loading, error } = useFetch(url);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (!response) {
    return <p>Start a conversation to see it here</p>;
  }
  const messages = response.filter((mes) => mes);
  return (
    <LastMessagesList
      messages={messages}
      userId={userId}
      onGoToChatPage={(id) => history.push(`/channels/${id}`)}
    />
  );
};

export default LastChannelsMessageList;

LastChannelsMessageList.propTypes = {
  userId: PropTypes.number.isRequired,
};
