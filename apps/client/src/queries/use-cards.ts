import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCards = async () => {
  const { data } = await axios.get("http://localhost:3001/api/cards/");
  return data;
};

export const useCards = () => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });
};
