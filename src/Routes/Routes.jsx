import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Main/Main";
import Chat from "../components/Chat/Chat";
export const routes = createBrowserRouter([
  { path: "/", element: <Main /> },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
