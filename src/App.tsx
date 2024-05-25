import "./App.css";
import { SummaryTable } from "./components/SummaryTable/SummaryTable";
import { DynamicForm } from "./features/DynamicForm/DynamicForm/DynamicForm";

function App() {
  return (
    <div className="container mx-auto p-10 flex gap-10">
      <DynamicForm />
      <SummaryTable fee={1000} creationDate="01/01/2024" />
    </div>
  );
}

export default App;
