import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";
import { useContext, useEffect, useRef, useState } from "react";
import { Avatar } from "@material-ui/core";
import ScrollableFeed from "react-scrollable-feed";
import Message from "../components/Message";
import io from "socket.io-client";
import { useHistory, useParams } from "react-router";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import mongoose from "mongoose";

function Chating() {
  const { chatId } = useParams();
  const history = useHistory();
  const focusDiv = useRef();
  const [disableButton, setDisableButton] = useState(true);
  const [input, setInput] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const ENDPOINT = "https://telegramclone99.herokuapp.com";
  // const ENDPOINT = "http://192.168.1.67:5000";
  const { myToken, myId } = useContext(AuthContext);
  const [msg_ids, setMsg_ids] = useState([]);

  useEffect(() => {
    if (!messages) return;
    let ids = messages
      .filter((message) => {
        return message.sender !== myId && message.seen === "false";
      })
      .map((message) => {
        return message._id;
      });

    setMsg_ids(ids);
    //eslint-disable-next-line
  }, [messages]);
  useEffect(() => {
    if (!messages) return;

    if (msg_ids.length > 0) {
      axios
        .post(
          `/api/message/seen`,
          { msg_ids },
          {
            headers: {
              "x-auth-token": myToken,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          const oldMessages = messages;
          oldMessages.map((message) => {
            if (msg_ids.includes(message._id)) {
              message.seen = "true";
            }
            return message;
          });
          setMessages(oldMessages);
          socket.emit("seen", msg_ids);
          setMsg_ids([]);
        })
        .catch((err) => {});
    }
    //eslint-disable-next-line
  }, [msg_ids]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("seen-messages", (messagesIds) => {
      const selectedMsgs = messages.filter((message) =>
        messagesIds.includes(message._id)
      );
      if (selectedMsgs.length > 0) {
        setMessages((prev) =>
          prev.map((message) => {
            if (messagesIds.includes(message._id)) {
              message.seen = "true";
            }
            return message;
          })
        );
      }
    });
  }, [socket, messages]);

  useEffect(() => {
    const s = io(`${ENDPOINT}`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;

    socket.emit("get-task", chatId);
  }, [socket, chatId]);

  useEffect(() => {
    axios
      .get(`/api/message/getAllMessages/${chatId}`, {
        headers: {
          "x-auth-token": myToken,
        },
      })
      .then((res) => {
        // console.log(res.data.targetUser);
        // setMessages(res.data.messages);
        setTargetUser(res.data.targetUser);
        setMessages(res.data.messages);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [myToken, chatId]);

  const inputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim() === "") {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    }
    focusDiv.current.focus();

    const newMessage = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      content: input,
      chatId: chatId,
      sender: myId,
      date: Date.now(),
      received: "false",
      seen: "false",
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setDisableButton(true);

    axios
      .post(`/api/message`, newMessage, {
        headers: {
          "x-auth-token": myToken,
        },
      })
      .then((res) => {
        socket.emit("send-message", res.data);
        setMessages([...messages, res.data]);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => history.goBack()}>
          <ArrowBackIcon fontSize="large" />
        </BackButton>
        <ChatInfoWrapper>
          <ChatInfo>
            <ChatInfoAvatar src={targetUser?.pic} />
            <Info>
              <Title>
                <h3>{targetUser?.name}</h3>
              </Title>
              <Status>
                <UserStatus>last seen recently</UserStatus>
              </Status>
            </Info>
          </ChatInfo>
        </ChatInfoWrapper>
      </Header>
      <MessageContainer>
        <Scrollable>
          <MessagesLayout>
            {messages.map((message, index) => {
              return (
                <Message
                  key={message?._id}
                  id={message?.sender}
                  text={message?.content}
                  received={message?.received}
                  seen={message?.seen}
                  date={message?.date}
                />
              );
            })}
          </MessagesLayout>
        </Scrollable>
      </MessageContainer>
      <Footer onSubmit={sendMessage}>
        <FooterInput
          dir="auto"
          ref={focusDiv}
          placeholder="Message"
          value={input}
          onChange={inputChange}
        ></FooterInput>
        <SendButton disabled={disableButton} type="submit">
          <SendIcon fontSize="medium" />
        </SendButton>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  background: #333;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  background: #212121;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const MessageContainer = styled.div`
  background: #0f0f0f;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`;

const MessagesLayout = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
  gap: 0.19rem;
`;

const Scrollable = styled(ScrollableFeed)`
  &::-webkit-scrollbar {
    width: 0px;
  }
  padding: 0.4rem;
`;

const Footer = styled.form`
  background: #212121;
  width: 100%;
  display: flex;
  align-items: center;

  /* padding: 0  0.5rem 0.5rem 0.5rem; */
`;

const FooterInput = styled.input`
  flex: 1;
  min-height: 2.875rem;
  max-height: 16rem;
  padding: 1rem;
  font-size: 1.1em;
  text-overflow: ellipsis;
  /* border-radius: 0.8rem; */
  border: none;
  outline: none;
  background: #212121;
  color: white;
`;

const BackButton = styled.button`
  margin-right: 0.5rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const SendButton = styled.button`
  margin-left: 0.5rem;
  color: ${(props) => (props.disabled ? "grey" : "white")};
  height: 2.875rem;
  width: 2.875rem;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ChatInfoWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

const ChatInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ChatInfoAvatar = styled(Avatar)`
  margin-right: 0.7rem;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.1rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  overflow: hidden;
  color: white;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const Status = styled.div`
  display: flex;
  font-size: 0.875rem;
  line-height: 1.125rem;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const UserStatus = styled.span`
  unicode-bidi: plaintext;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Chating;
