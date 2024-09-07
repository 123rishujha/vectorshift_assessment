import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { Toaster } from "react-hot-toast";
// import MyTextInput from "./utils/MyTextInput";

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <Toaster />
    </div>
  );
}

export default App;
