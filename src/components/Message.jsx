import React from "react";
import styled from "styled-components";

const Message = ({ id, text }) => {
  return (
    <MessageBody id={id} className={`${id === 1 ? "me" : "target"}`}>
      <MessageWrapper id={id}>
        <MessageContent>
          <TextContent>
            {text}
            <MessageMeta>
              <MessageTime>12:55 AM</MessageTime>
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
  justify-content: ${({ id }) => (id === 1 ? "flex-end" : "flex-start")};
`;

const MessageWrapper = styled.div`
  min-width: 0;
  max-width: 80%;
  background: #8658dd;
  color: white;
  /* border-top-left-radius: 0.65rem;
  border-bottom-left-radius: 0.65rem;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem; */
  border-radius: ${({ id }) =>
    id === 1
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
  margin-right: 0.45rem;
  font-size: 0.75rem;
  white-space: nowrap;
`;

export default Message;
