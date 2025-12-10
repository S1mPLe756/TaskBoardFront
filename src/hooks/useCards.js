import {useState} from "react";

export function useCards() {
  const [loading, setLoading] = useState(false);


  return {
    loading,
  };
}
