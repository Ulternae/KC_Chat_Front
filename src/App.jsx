import { HashRouter, Routes, Route } from "react-router-dom";
import { CreateAccount } from "./pages/Account/Create";
import { LoginAccount } from "./pages/Account/Login";
import { Home } from "./pages/Home";
import { ChatProvider } from "./context/Provider";
import { Default } from "./pages/Default";
import { Profile } from "./pages/Profile";
import { Account } from "./pages/Profile/Account";
import { Settings } from "./pages/Profile/Settings";

const App = () => {
  return (
    <ChatProvider>
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
            <Route path="friends" element={<>Friends</>} />
            <Route path="groups" element={<>GROUPS</>} />
            <Route path="messages/friends" element={<>/messages/friends</>} />
            <Route path="messages/groups" element={<>GROUPS</>} />
          </Route>
          <Route path="/*" element={<p>404</p>} />
        </Routes>
      </HashRouter>
    </ChatProvider>
  );
};

export { App };
