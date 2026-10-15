import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Fonts } from '@/constants/theme';
import { CalendarIcon, ImageIcon } from './Icons';
import { CalendarModal } from './CalendarModal';
import { Todo } from '@/types';

interface AddEditTodoModalProps {
  visible: boolean;
  mode: 'add' | 'edit';
  initialData?: Todo | null;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; deadline?: string; imageUri?: string }) => void;
}

export const AddEditTodoModal = ({
  visible,
  mode,
  initialData,
  onClose,
  onSubmit,
}: AddEditTodoModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description);
        setDeadline(initialData.deadline || '');
        setImageUri(initialData.imageUri);
      } else {
        setTitle('');
        setDescription('');
        setDeadline('');
        setImageUri(undefined);
      }
      setError('');
    }
  }, [visible, mode, initialData]);

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch {
      setError('Не вдалося вибрати зображення');
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError('Введіть назву завдання');
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline: deadline.trim() || undefined,
      imageUri,
    });
    onClose();
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.overlay}
        >
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
          <View style={styles.sheetContainer}>
            <View style={styles.handleBar} />
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TextInput
                style={styles.titleInput}
                placeholder="Title"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                  setError('');
                }}
              />

              <TextInput
                style={styles.descInput}
                placeholder="Description"
                placeholderTextColor="rgba(255,255,255,0.7)"
                value={description}
                onChangeText={setDescription}
                multiline
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setCalendarVisible(true)}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionText, deadline ? styles.optionTextFilled : null]}>
                  {deadline || 'Deadline (Optional)'}
                </Text>
                <CalendarIcon size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionRow}
                onPress={handlePickImage}
                activeOpacity={0.8}
              >
                <Text style={[styles.optionText, imageUri ? styles.optionTextFilled : null]}>
                  {imageUri ? 'Image Selected (Tap to change)' : 'Add Image (Optional)'}
                </Text>
                <ImageIcon size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {imageUri ? (
                <View style={styles.imagePreviewWrapper}>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageBtn}
                    onPress={() => setImageUri(undefined)}
                  >
                    <Text style={styles.removeImageText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              <TouchableOpacity style={styles.submitBtn} onPress={handleSave} activeOpacity={0.85}>
                <Text style={styles.submitBtnText}>
                  {mode === 'add' ? 'ADD TODO' : 'EDIT TODO'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <CalendarModal
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
        onSelectDate={(d) => setDeadline(d)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 36,
    maxHeight: '88%',
  },
  handleBar: {
    width: 60,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 20,
  },
  errorText: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(234, 92, 84, 0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    textAlign: 'center',
  },
  titleInput: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontFamily: Fonts.bodySemiBold,
    fontSize: 15,
  },
  descInput: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    minHeight: 180,
  },
  optionRow: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
  },
  optionTextFilled: {
    color: '#FFFFFF',
    fontFamily: Fonts.bodySemiBold,
  },
  imagePreviewWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },
  removeImageBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  removeImageText: {
    color: '#FFFFFF',
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
  },
  submitBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  submitBtnText: {
    color: Colors.primaryDark,
    fontFamily: Fonts.bodyBold,
    fontSize: 15,
    letterSpacing: 0.5,
  },
});
