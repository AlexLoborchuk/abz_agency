import "./style/style.css";
import { HeaderComponent } from "./components/header/Header";
import { GetRequestComponent } from "./components/body/GetRequestComponent";
import { PostRequestComponent } from "./components/body/PostRequestComponent";

function App() {
  return (
    <div className="container">
      <HeaderComponent />
      <GetRequestComponent />
      <PostRequestComponent />
    </div>
  );
}

export default App;
