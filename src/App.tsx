import { useEffect, useState } from "react";
import "./App.css";
import { SummaryTable } from "./components/SummaryTable/SummaryTable";
import { DynamicForm } from "./features/DynamicForm/DynamicForm/DynamicForm";
import { ActionStatusEnum } from "./types/ActionStatusEnum";
import { FormModel } from "./types/dynamic-form/Form";
import { fetchForm } from "./redux/slice/dynamicForm/dynamicFormApi";
import { DynamicFormModal } from "./components/DynamicFormModal/DynamicFormModal";

function App() {
  const [dynamicForm, setDynamicForm] = useState({} as FormModel);
  const [fetchStatus, setFetchStatus] = useState(ActionStatusEnum.Idle);

  useEffect(() => {
    setFetchStatus(ActionStatusEnum.Pending);
    fetchForm(1)
      .then((data) => {
        setDynamicForm(data);
        setFetchStatus(ActionStatusEnum.Success);
      })
      .catch(() => setFetchStatus(ActionStatusEnum.Failed));
  }, []);

  return (
    <div className="container mx-auto p-10 flex gap-10">
      <DynamicForm dynamicForm={dynamicForm} fetchStatus={fetchStatus} />
      <SummaryTable fee={1000} creationDate="01/01/2024" />
      <DynamicFormModal />
    </div>
  );
}

export default App;
