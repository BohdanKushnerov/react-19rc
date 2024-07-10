import { useActionState, useOptimistic } from "react";

interface IInitState {
  error: string | null;
  name: string;
}

const fetchFn = async (name: string, prevName: string) => {
  try {
    if (!name) {
      throw new Error("Name is required");
    }

    return await new Promise<IInitState>((res) => {
      setTimeout(() => {
        const resultResponse: IInitState = { error: null, name: name };
        res(resultResponse);
      }, 2000);
    });
  } catch (error) {
    return { error: "Name is required", name: prevName } as IInitState;
  }
};

const initialState: IInitState = { error: null, name: "" };

const ChangeNameFormOptimistic = () => {
  const [state, formAction, pending] = useActionState<IInitState, FormData>(
    async (
      previousState: IInitState,
      formData: FormData
    ): Promise<IInitState> => {
      const newName = formData.get("name") as string;

      setOptName(newName);

      return await fetchFn(newName, previousState.name);
    },
    initialState
  );

  const [optName, setOptName] = useOptimistic<string>(state.name);

  console.log(state);

  return (
    <form action={formAction}>
      {optName && <div>Current name: {optName}</div>}
      <input type="text" name="name" placeholder="New name" />
      <button type="submit" disabled={pending}>
        Submit
      </button>
      <div>{state.error}</div>
    </form>
  );
};

export default ChangeNameFormOptimistic;
