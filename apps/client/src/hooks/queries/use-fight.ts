import { BattleRequest, BattleResponse } from "@ag-cookunity/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useFight = () => {
  return useMutation<BattleResponse, Error, BattleRequest>({
    mutationFn: async (body) => {
      const { data } = await axios.post(
        "http://localhost:3001/api/battle",
        body
      );
      return data;
    },
    onError: (error: Error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log("Fight successful", data);
    }
  });
};
