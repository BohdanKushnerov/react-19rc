import "./App.css";
import Message from "./use/Message";
import Post from "./use/Post";
import ChangeNameForm from "./useActionState/ChangeNameForm";
import ChangeNameFormOptimistic from "./useOptimistic/ChangeNameFormOptimistic";

function App() {
  // use
  // return <Message />;
  // return <Post />;

  // useActionState
  // return <ChangeNameForm />;

  // useOptimistic
  return <ChangeNameFormOptimistic />;
}

export default App;
