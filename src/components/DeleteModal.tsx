import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

interface DeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteModal = ({ visible, onConfirm, onCancel }: DeleteModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onCancel}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.deleteButton} onPress={onConfirm} activeOpacity={0.8}>
            <Text style={styles.deleteText}>Delete TODO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.8}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    gap: 12,
  },
  deleteButton: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  deleteText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 15,
    color: Colors.danger,
  },
  cancelButton: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cancelText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 15,
    color: Colors.success,
  },
});
