
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useTasks } from '../context/TasksContext';

export default function HomeScreen() {
  const { tasks } = useTasks();

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = tasks.length - completed;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Daily Tasks</Text>

      <Text style={styles.subtitle}>
        Your daily progress at a glance.
      </Text>

      <View style={styles.card}>
        <Text style={styles.number}>{tasks.length}</Text>
        <Text>Total Tasks</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>{completed}</Text>
        <Text>Completed Tasks</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>{pending}</Text>
        <Text>Pending Tasks</Text>
      </View>

      <Link href="/tasks" style={styles.link}>
        Manage My Tasks
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    color: '#64748B',
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  number: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 4,
  },
  link: {
    color: '#2563EB',
    fontWeight: 'bold',
    marginTop: 12,
  },
});