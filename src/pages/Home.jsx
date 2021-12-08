import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import ScrollableFeed from "react-scrollable-feed";
import Chat from "../components/Chat";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

function Home() {
  // const ENDPOINT = "http://192.168.1.67:5000";

  const { myToken } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/chat`, {
        headers: {
          "x-auth-token": myToken,
        },
      })
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [myToken]);
  return (
    <Container>
      <Header>
        <MenuButton>
          <MenuIcon fontSize="medium" />
        </MenuButton>
        <SearchInputWrapper>
          <Input placeholder="Search" />
        </SearchInputWrapper>
      </Header>
      <ChatsContainer>
        <Scrollable>
          <ChatsLayout>
            {chats.map((chat) => {
              return (
                <Chat
                  key={chat?.chatInfo?.chatId}
                  targetName={chat?.targetInfo?.name}
                  avatar={chat?.targetInfo?.pic}
                  lastMessage={chat?.chatInfo?.latestMessage?.content}
                  lastMessageDate={chat?.chatInfo?.latestMessage?.date}
                  chatId={chat?.chatInfo?.chatId}
                />
              );
            })}
          </ChatsLayout>
        </Scrollable>
      </ChatsContainer>
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

const ChatsContainer = styled.div`
  background: #212121;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  overflow: hidden;
`;

const ChatsLayout = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  overflow: auto;
`;

const Scrollable = styled(ScrollableFeed)`
  &::-webkit-scrollbar {
    width: 0px;
  }
  /* padding: 0.4rem; */
`;

const MenuButton = styled.button`
  margin-right: 0.5rem;
  color: white;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Input = styled.input`
  background: #2c2c2c;
  border: none;
  border-radius: 1rem;
  color: white;
  font-size: 1.2rem;
  margin: 0;
  padding: 0.5rem;
  width: 100%;
  outline: none;
`;

export default Home;
