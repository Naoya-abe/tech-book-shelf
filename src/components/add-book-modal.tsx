import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, body: string) => void;
};

export default function AddBookModal({ visible, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
            <Text style={styles.modalTitle}>新しい本を追加</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="タイトル"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="概要"
              placeholderTextColor="#999"
              value={body}
              onChangeText={setBody}
              multiline
            />
            <TouchableOpacity
              style={[styles.modalButton, styles.modalAddButton]}
              onPress={() => onSubmit(title, body)}
            >
              <Text style={styles.modalButtonText}>追加</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => onClose()}
            >
              <Text style={styles.modalCancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40, // More bottom padding for aesthetics
    minHeight: 320,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  handleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  modalInput: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  modalButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  modalAddButton: {
    backgroundColor: "#007AFF",
    marginBottom: 12,
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalCancelButton: {
    backgroundColor: "transparent",
    padding: 12,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalCancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
});
