import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import Moment from "react-moment";

const Chat = ({ targetName, avatar, lastMessage, chatId, lastMessageDate }) => {
  return (
    <ChatContainer to={`chat/${chatId}`}>
      <ChatStatus>
        <ChatStatusAvatar src={avatar} />
      </ChatStatus>
      <ChatInfo>
        <Title>
          <TitleText>{targetName}</TitleText>
          <LastMessageMeta>
            <span>
              {lastMessage && (
                <Moment format="hh:mm A">{lastMessageDate}</Moment>
              )}
            </span>
          </LastMessageMeta>
        </Title>
        <SubTitle>
          <LastMessage>{lastMessage}</LastMessage>
        </SubTitle>
      </ChatInfo>
    </ChatContainer>
  );
};

const ChatContainer = styled(Link)`
  border: none;
  width: 100%;
  display: flex;
  padding: 0.5rem;
  /* cursor: pointer; */
  text-decoration: none;
`;

const ChatStatus = styled.div`
  align-items: center;
`;
const ChatStatusAvatar = styled(Avatar)`
  margin-right: 0.7rem;
  width: 3.5rem !important;
  height: 3.5rem !important;
  font-size: 1.1rem;
`;

const ChatInfo = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Title = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TitleText = styled.h3`
  width: auto;
  max-width: 80%;
  font-weight: 500;
  color: white;
  font-size: 1.25rem;
`;

const LastMessageMeta = styled.div`
  margin-right: 0.2rem;
  padding: 0.3rem 0 0.15rem;
  flex-shrink: 0;
  font-size: 0.75rem;
  line-height: 1;
  display: flex;
  align-items: center;
  margin-left: auto;

  & span {
    color: #999;
  }
`;
const SubTitle = styled.h3`
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -0.125rem;
`;
const LastMessage = styled.p`
  padding-right: 0.25rem;
  flex-grow: 1;
  color: lightgrey;
  text-align: left;
  font-size: 1rem;
`;

export default Chat;
