import { Post } from "@/types/post";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

const URL = "https://jsonplaceholder.typicode.com/posts";

export function useRecommendedBooks() {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    isLoading,
    error,
    refetch,
    add,
  };
}
