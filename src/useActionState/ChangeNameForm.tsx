import { useActionState } from "react";

interface IInitState {
  error: string | null;
  name: string;
}

const fetchFn = async (name: string, prevName: string) => {
  try {
    if (!name) {
      throw new Error("Name is required");
    } else {
      return await new Promise<IInitState>((res) => {
        setTimeout(() => {
          const resultResponse: IInitState = { error: null, name: name };
          res(resultResponse);
        }, 2000);
      });
    }
  } catch (error) {
    return { error: "Name is required", name: prevName } as IInitState;
  }
};

const initialState: IInitState = { error: null, name: "" };

const ChangeNameForm = () => {
  const [state, formAction, pending] = useActionState<IInitState, FormData>(
    async (
      previousState: IInitState,
      formData: FormData
    ): Promise<IInitState> => {
      const newName = formData.get("name") as string;

      return await fetchFn(newName, previousState.name);
    },
    initialState
  );

  return (
    <form action={formAction}>
      {state.name && <div>Current name: {state.name}</div>}
      <input type="text" name="name" placeholder="New name" />
      <button type="submit" disabled={pending}>
        Submit
      </button>
      <div>{state.error}</div>
    </form>
  );
};

export default ChangeNameForm;
