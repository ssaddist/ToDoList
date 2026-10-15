import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '@/constants/theme';
import { BackIcon, ClockIcon, PencilIcon, TrashIcon } from '@/components/Icons';
import { Todo } from '@/types';

interface DetailScreenProps {
  todo: Todo;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const DetailScreen = ({ todo, onBack, onEdit, onDelete }: DetailScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <BackIcon size={24} color={Colors.text} />
          </TouchableOpacity>

          <View style={styles.actionsGroup}>
            <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}>
              <ClockIcon size={22} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onEdit}
              hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            >
              <PencilIcon size={22} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              hitSlop={{ top: 10, bottom: 10, left: 8, right: 8 }}
            >
              <TrashIcon size={22} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{todo.title.toUpperCase()}</Text>

          {todo.deadline ? (
            <View style={styles.deadlineContainer}>
              <Text style={styles.deadlineLabel}>Deadline: </Text>
              <Text style={styles.deadlineValue}>{todo.deadline}</Text>
            </View>
          ) : null}

          <Text style={styles.description}>{todo.description}</Text>

          {todo.imageUri ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: todo.imageUri }} style={styles.image} resizeMode="cover" />
            </View>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.createdText}>Created at {todo.createdAt}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 26,
    color: Colors.text,
    letterSpacing: 1,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  deadlineLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 12,
    color: Colors.danger,
  },
  deadlineValue: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 12,
    color: Colors.text,
  },
  description: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  imageContainer: {
    marginTop: 8,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundLight,
  },
  image: {
    width: '100%',
    height: 220,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  createdText: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 12,
    color: Colors.textMuted,
  },
});
