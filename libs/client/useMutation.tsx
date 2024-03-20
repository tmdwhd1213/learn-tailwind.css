import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

export default function useMutation(
  url: string
): [(data: any) => void, UseMutationState] {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const mutation = async (data: any) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setState({ ...state, data: json });
    } catch (error: any) {
      setState({ ...state, error });
    } finally {
      setState({ ...state, loading: false });
    }
  };

  return [mutation, { ...state }];
}
