import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AllCards from "./modules/all-cards.module";
import BlockedCards from "./modules/blocked-cards.module";
import YourCards from "./modules/your-cards.module";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<YourCards/>}/>
        <Route path="/all" element={<AllCards/>}/>
        <Route path="/blocked" element={<BlockedCards/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
