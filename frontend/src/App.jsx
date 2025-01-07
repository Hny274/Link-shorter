import Body from "./components/body.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster position="bottom-right" />
      <Body />
    </div>
  );
};

export default App;
