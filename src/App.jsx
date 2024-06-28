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
            <Route path="groups" element={<>GROUPS</>} />
            <Route path="messages/friends" element={<MessagesFriends />} />
            <Route path="messages/friends/:user_id" element={<MessagesFriends />} />
            <Route path="messages/groups" element={<>GROUPS</>} />
            <Route path="messages/groups/:group_id" element={<>GROUPS</>} />
          </Route>
          <Route path="/*" element={<p>404</p>} />
        </Routes>
      </HashRouter>
    </ChatProvider>
  );
};

export { App };
