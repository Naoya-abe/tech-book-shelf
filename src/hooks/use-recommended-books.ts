import { Post } from "@/types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

const URL = "https://jsonplaceholder.typicode.com/posts";
const DONE_KEY = "@done";

export function useRecommendedBooks() {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [done, setDone] = useState<number[]>([]);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setData(data.slice(0, 10));
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const add = useCallback(async (title: string, body: string) => {
    if (!title || !body) {
      Alert.alert("Error", "タイトルと概要は入力必須です");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const newPost: Post = {
        userId: Math.floor(Math.random() * 10) + 1,
        id: Date.now(),
        title,
        body,
      };
      setData((prev) => [newPost, ...prev]);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadDone = async () => {
    try {
      const done = await AsyncStorage.getItem(DONE_KEY);
      if (done) {
        setDone(JSON.parse(done));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDone = async (id: number) => {
    let targetData;
    if (done.includes(id)) {
      targetData = done.filter((item) => item !== id);
    } else {
      targetData = [...done, id];
    }
    setDone(targetData);

    try {
      await AsyncStorage.setItem(DONE_KEY, JSON.stringify(targetData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refetch();
    loadDone();
  }, [refetch]);

  return {
    data,
    done,
    isLoading,
    error,
    refetch,
    add,
    toggleDone,
  };
}
