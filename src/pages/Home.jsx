import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@material-ui/core";
import ScrollableFeed from "react-scrollable-feed";
import Message from "../components/Message";
import io from "socket.io-client";

function Home() {
  const focusDiv = useRef();
  const [disableButton, setDisableButton] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [socket, setSocket] = useState();
  const ENDPOINT = "http://192.168.1.67:5000";

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  useEffect(() => {
    const s = io(`${ENDPOINT}`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;

    socket.emit("get-task", "myId");
  }, [socket]);

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
    setMessages([...messages, { message: input, isUser: true }]);
    setInput("");
    setDisableButton(true);
    socket.emit("send-message", { message: input, isUser: true });
  };

  const fetchId = 1;
  return (
    <Container>
      <Header>
        <BackButton>
          <ArrowBackIcon fontSize="large" />
        </BackButton>
        <ChatInfoWrapper>
          <ChatInfo>
            <ChatInfoAvatar src="https://i.pravatar.cc/300" />
            <Info>
              <Title>
                <h3>Osama</h3>
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
                <Message key={index} id={fetchId} text={message?.message} />
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

export default Home;
