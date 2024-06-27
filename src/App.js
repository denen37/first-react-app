import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";
import TodoDetails from "./pages/TodoDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="todo" element={<Main />} />
        <Route path="todo/:id" element={<TodoDetails />} />
      </Routes>
    </>
  )
}

export default App;
