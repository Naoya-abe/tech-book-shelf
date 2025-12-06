import { Post } from "@/types/post";
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: Post;
  isDone: boolean;
  onToggle: (id: number) => void;
};

const BookItem = memo(({ item, isDone, onToggle }: Props) => {
  return (
    <View style={styles.bookItem}>
      <View style={styles.textContainer}>
        <Text style={styles.bookItemTitle}>{item.title}</Text>
        <Text style={styles.bookItemBody}>{item.body}</Text>
      </View>
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Ionicons
          name={isDone ? "book" : "book-outline"}
          size={30}
          color={isDone ? "green" : "gray"}
        />
      </TouchableOpacity>
    </View>
  );
});

BookItem.displayName = "BookItem";

export default BookItem;

const styles = StyleSheet.create({
  bookItem: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: { flex: 1, paddingRight: 16 },
  bookItemTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  bookItemBody: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
