
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

import { useTasks } from '../context/TasksContext';

export default function TasksScreen() {
  const [title, setTitle] = useState('');

  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  function handleAddTask() {
    const cleanTitle = title.trim();

    if (!cleanTitle) return;

    addTask(cleanTitle);
    setTitle('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter a task"
          style={styles.input}
        />

        <Pressable
          onPress={handleAddTask}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No tasks yet. Add your first task!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Pressable
              style={styles.taskContent}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={styles.taskTitle}>
                {item.completed ? '☑ ' : '☐ '}
                {item.title}
              </Text>
            </Pressable>

            <Pressable onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E293B',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  addButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 30,
  },
  taskRow: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#1E293B',
  },
  delete: {
    color: '#DC2626',
    marginLeft: 12,
  },
});