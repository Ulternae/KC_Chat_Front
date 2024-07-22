import { HashRouter, Routes, Route } from "react-router-dom";
import { CreateAccount } from "@pages/Account/Create";
import { LoginAccount } from "@pages/Account/Login";
import { Home } from "@pages/Home";
import { ChatProvider } from "@context/Provider";
import { Default } from "@pages/Default";
import { Profile } from "@pages/Profile";
import { Account } from "@pages/Profile/Account";
import { Settings } from "@pages/Profile/Settings";
import { Friends } from "@pages/Friends";
import { MessagesFriends } from "@pages/MessagesFriends";
import { Messages } from "@pages/Messages";
import '@github/relative-time-element';
import { Groups } from "@pages/Groups";

const App = ({ settings }) => {
  return (
    <ChatProvider settings={settings}>
      <HashRouter>
        <Routes>
          <Route path="/account" element={<CreateAccount />} />
          <Route path="/login" element={<LoginAccount />} />
          <Route path="/" element={<Home />}>
            <Route index element={<Default />} />
            <Route path="profile" element={<Profile />}>
              <Route path="account" element={<Account />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="friends" element={<Friends/>} />
            <Route path="groups" element={<Groups />} /> 
            <Route path="messages" element={<Messages />} >
              <Route path="friends" element={<MessagesFriends />} />
              <Route path="friends/:chat_id_user" element={<MessagesFriends />} />
              <Route path="groups" element={<>GROUPS</>} /> 
              <Route path="groups/:group_id" element={<>GROUPS</>} />
              <Route path="groups/:group_id/:chat_id" element={<>GROUPS</>} />
            </Route> 
          </Route>
          <Route path="/*" element={<p>404</p>} />
        </Routes>
      </HashRouter>
    </ChatProvider>
  );
};

export { App };
