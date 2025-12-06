import AddBookModal from "@/components/add-book-modal";
import BookItem from "@/components/book-item";
import { useRecommendedBooks } from "@/hooks/use-recommended-books";
import { Post } from "@/types/post";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data, done, isLoading, error, refetch, add, toggleDone } =
    useRecommendedBooks();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleAdd = useCallback(
    (title: string, body: string) => {
      add(title, body);
      setModalVisible(false);
    },
    [add]
  );

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <BookItem
        item={item}
        isDone={done.includes(item.id)}
        onToggle={toggleDone}
      />
    ),
    [done, toggleDone]
  );

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
        <TouchableOpacity onPress={handleModalOpen} style={styles.addBtn}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
        <AddBookModal
          visible={modalVisible}
          onClose={handleModalClose}
          onSubmit={handleAdd}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
  },
  content: { flex: 1 },
  bookList: {
    padding: 16,
    paddingBottom: 100, // Make space for FAB
  },
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
  addBtn: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#007AFF",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
