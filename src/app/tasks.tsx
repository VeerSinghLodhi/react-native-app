

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem('daily_tasks');

        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadTasks();
  }, []);
  useEffect(() => {
    if (!isLoaded) return;

    async function saveTasks() {
      try {
        await AsyncStorage.setItem(
          'daily_tasks',
          JSON.stringify(tasks)
        );
      } catch (error) {
        console.error('Failed to save tasks:', error);
      }
    }

    saveTasks();
  }, [tasks, isLoaded]);
  function addTask() {
    const title = taskText.trim();

    if (!title) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setTasks(previousTasks => [
      ...previousTasks,
      newTask,
    ]);

    setTaskText('');
  }

  function toggleTask(id: string) {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks(previousTasks =>
      previousTasks.filter(task => task.id !== id)
    );
  }

  const completedCount = tasks.filter(
    task => task.completed
  ).length;
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          Stay organized, one task at a time.
        </Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          {completedCount} of {tasks.length} tasks completed
        </Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          placeholderTextColor="#94A3B8"
          value={taskText}
          onChangeText={setTaskText}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />

        <Pressable
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add your first task!
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Pressable
              style={styles.taskContent}
              onPress={() => toggleTask(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkedBox,
                ]}
              >
                {item.completed && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.completedTitle,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => deleteTask(item.id)}
              hitSlop={8}
              accessibilityLabel={`Delete ${item.title}`}
            >
              <Text style={styles.deleteText}>Delete</Text>
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
    backgroundColor: '#F1F5F9',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
  },

  summary: {
    backgroundColor: '#DBEAFE',
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
  },

  summaryText: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '600',
  },

  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  list: {
    paddingBottom: 30,
    flexGrow: 1,
  },

  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },

  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedBox: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },

  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  taskTitle: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
  },

  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },

  deleteText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#64748B',
    fontSize: 15,
  },
});


// import { View, Text, StyleSheet } from 'react-native';

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         My Daily Tasks
//       </Text>

//       <Text style={styles.subtitle}>
//         Learn React Native step by step!
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#EAF4FF',
//     padding: 20,
//   },

//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#222222',
//   },

//   subtitle: {
//     fontSize: 16,
//     color: '#555555',
//     marginTop: 10,
//   },
// });