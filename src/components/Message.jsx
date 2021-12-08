import React, { useContext } from "react";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import DoneIcon from "@material-ui/icons/Done";
import TimerIcon from "@material-ui/icons/Timer";
import Moment from "react-moment";
const Message = ({ id, text, received, date }) => {
  const { myId } = useContext(AuthContext);
  return (
    <MessageBody
      myId={myId}
      id={id}
      className={`${id === myId ? "me" : "target"}`}
    >
      <MessageWrapper id={id} myId={myId}>
        <MessageContent>
          <TextContent>
            {text}
            <MessageMeta>
              <MessageTime>
                <Moment format="hh:mm A">{date}</Moment>
                {id === myId ? (
                  <>
                    {(received === "true" && <RecievedMessage />) || (
                      <WaitingMessage />
                    )}
                  </>
                ) : (
                  <></>
                )}
              </MessageTime>
            </MessageMeta>
          </TextContent>
        </MessageContent>
      </MessageWrapper>
    </MessageBody>
  );
};

const MessageBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ id, myId }) =>
    id === myId ? "flex-end" : "flex-start"};
`;

const MessageWrapper = styled.div`
  min-width: 0;
  max-width: 80%;
  background: ${({ id, myId }) => (id === myId ? "#8658dd" : "#212121")};
  color: white;
  /* border-top-left-radius: 0.65rem;
  border-bottom-left-radius: 0.65rem;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem; */
  border-radius: ${({ id, myId }) =>
    id === myId
      ? "0.65rem 0.2rem 0.2rem 0.65rem;"
      : "0.2rem 0.65rem 0.65rem 0.2rem;"};
  padding: 0.2125rem 0.5rem 0.375rem;
`;

const MessageContent = styled.div``;
const TextContent = styled.p`
  margin: 0;
  word-break: break-word;
  line-height: 1.3125;
  text-align: initial;
  display: flow-root;
  unicode-bidi: plaintext;
`;

const MessageMeta = styled.span`
  position: relative;
  top: 0.375rem;
  bottom: auto !important;
  float: right;
  line-height: 1;
  height: calc(var(--message-meta-height, 1rem));
  margin-left: 0.4375rem;
  margin-right: -0.5rem;
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  white-space: nowrap;
  margin-right: 0.3rem;
`;

const RecievedMessage = styled(DoneIcon)`
  width: 1rem !important;
  height: 1rem !important;
  margin-right: 0.1rem;
`;
const WaitingMessage = styled(TimerIcon)`
  width: 1rem !important;
  height: 1rem !important;
  margin-right: 0.1rem;
  display: none;
`;

export default Message;
