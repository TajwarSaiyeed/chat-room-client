import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";

function App() {
  return (
    <div className="container">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
