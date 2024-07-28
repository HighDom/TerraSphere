import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/appwrite";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fn();

        setData(response);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = () => fetchData;

  return { data, isLoading, refetch };
};

export default useAppwrite;