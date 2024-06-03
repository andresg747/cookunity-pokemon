import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCards = async () => {
  // Make sure you have the NEXT_PUBLIC_SERVER_API_URL environment variable set!
  const { data } = await axios.get(
    `http://${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/cards/`
  );
  return data;
};

export const useCards = () => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });
};
