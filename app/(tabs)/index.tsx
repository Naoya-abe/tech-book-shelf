import AddBookModal from "@/components/add-book-modal";
import { useRecommendedBooks } from "@/hooks/use-recommended-books";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { data, isLoading, error, refetch, add } = useRecommendedBooks();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleAdd = (title: string, body: string) => {
    add(title, body);
    setModalVisible(false);
  };

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );

  return (
    <View style={styles.screenContainer}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text>Header</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookItemTitle}>{item.title}</Text>
              <Text style={styles.bookItemBody}>{item.body}</Text>
            </View>
          )}
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
    backgroundColor: "#fff",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: { height: 100 },
  content: { flex: 1 },
  bookList: {
    padding: 16,
  },
  bookItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 16,
  },
  bookItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookItemBody: {
    fontSize: 14,
  },
  addBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
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
