import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '@/constants/theme';
import { ListIcon, FilterIcon, SettingsIcon, ClockIcon, PlusIcon } from '@/components/Icons';
import { Todo, FilterType } from '@/types';

interface HomeScreenProps {
  todos: Todo[];
  filter: FilterType;
  onFilterChange: (newFilter: FilterType) => void;
  onSelectTodo: (todo: Todo) => void;
  onOpenAddModal: () => void;
  onOpenProfile: () => void;
}

export const HomeScreen = ({
  todos,
  filter,
  onFilterChange,
  onSelectTodo,
  onOpenAddModal,
  onOpenProfile,
}: HomeScreenProps) => {
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);

  const filterOptions: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'By Time', value: 'by_time' },
    { label: 'Deadline', value: 'deadline' },
  ];

  const handleSelectFilter = (val: FilterType) => {
    onFilterChange(val);
    setFilterMenuVisible(false);
  };

  const renderTodoCard = ({ item }: { item: Todo }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => onSelectTodo(item)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <ClockIcon size={18} color="#FFFFFF" />
      </View>

      <Text style={styles.cardDesc} numberOfLines={2}>
        {item.description}
      </Text>

      <Text style={styles.cardFooter}>Created at {item.createdAt}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topRow}>
            <Text style={styles.brandTitle}>TO DO LIST</Text>
            <TouchableOpacity
              onPress={onOpenProfile}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <SettingsIcon size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <View style={styles.titleWithIcon}>
              <ListIcon size={24} color={Colors.danger} />
              <Text style={styles.mainHeading}>LIST OF TODO</Text>
            </View>

            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setFilterMenuVisible(!filterMenuVisible)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <FilterIcon size={22} color={Colors.danger} />
            </TouchableOpacity>
          </View>
        </View>

        {todos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet</Text>
            <Text style={styles.emptySubText}>Tap + button below to add your first task</Text>
          </View>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={renderTodoCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={onOpenAddModal}
          activeOpacity={0.85}
        >
          <PlusIcon size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <Modal
          visible={filterMenuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setFilterMenuVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setFilterMenuVisible(false)}
          >
            <View style={styles.filterDropdown}>
              {filterOptions.map((opt) => {
                const isActive = filter === opt.value;
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={styles.filterOptionItem}
                    onPress={() => handleSelectFilter(opt.value)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        isActive && styles.filterOptionTextActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </Modal>
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
    position: 'relative',
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandTitle: {
    fontFamily: Fonts.title,
    fontSize: 16,
    color: Colors.primaryDark,
    letterSpacing: 0.5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mainHeading: {
    fontFamily: Fonts.title,
    fontSize: 24,
    color: Colors.danger,
    letterSpacing: 1,
  },
  filterBtn: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 22,
    paddingBottom: 90,
    paddingTop: 4,
    gap: 14,
  },
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    gap: 8,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: Fonts.bodyBold,
    fontSize: 15,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  cardDesc: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  cardFooter: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 8,
  },
  emptyText: {
    fontFamily: Fonts.bodyBold,
    fontSize: 18,
    color: Colors.textMuted,
  },
  emptySubText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 26,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: Colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  filterDropdown: {
    position: 'absolute',
    top: 96,
    right: 22,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  filterOptionItem: {
    paddingVertical: 8,
  },
  filterOptionText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.text,
  },
  filterOptionTextActive: {
    color: Colors.danger,
  },
});
