import { BattleRequest, BattleResponse } from "@ag-cookunity/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useFight = () => {
  return useMutation<BattleResponse, Error, BattleRequest>({
    mutationFn: async (body) => {
      const { data } = await axios.post(
        `http://${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/battle`,
        body
      );
      return data;
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
};
