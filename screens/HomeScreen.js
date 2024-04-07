import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState(moment().format('DD/MM/YYYY'));

  useEffect(() => {
    retrieveTasks();
  }, []);

  const retrieveTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
        console.log('Tarefas recuperadas:', JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Erro ao recuperar tarefas: ', error);
    }
  };

  const storeTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Tarefas armazenadas:', tasks);
    } catch (error) {
      console.error('Erro ao armazenar tarefas: ', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setEditedTask(null);
    setTaskTitle('');
    setTaskDescription('');
    setTaskDate(moment().format('DD/MM/YYYY'));
  };

  const addTask = () => {
    if (!taskTitle.trim()) return;
    const newTask = { id: Math.random().toString(), title: taskTitle, description: taskDescription, date: taskDate };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    storeTasks(updatedTasks);
    toggleModal();
  };

  const editTask = () => {
    if (!taskTitle.trim()) return;
    const updatedTasks = tasks.map(task => {
      if (task.id === editedTask.id) {
        return { ...task, title: taskTitle, description: taskDescription, date: taskDate };
      }
      return task;
    });
    setTasks(updatedTasks);
    storeTasks(updatedTasks);
    toggleModal();
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    storeTasks(updatedTasks);
  };

  const openEditModal = (task) => {
    setEditedTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskDate(task.date);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
              <Text style={styles.taskDate}>{item.date}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                  <MaterialIcons name="edit" size={24} color="#6a1b9a" />
                </TouchableOpacity>
                <View style={{width: 10}}></View>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <MaterialIcons name="delete" size={24} color="#6a1b9a" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={taskTitle}
              onChangeText={text => setTaskTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={taskDescription}
              onChangeText={text => setTaskDescription(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Data (DD/MM/YYYY)"
              value={taskDate}
              onChangeText={text => setTaskDate(text)}
            />
            <View style={styles.buttonContainer}>
              <Button title={editedTask ? "Editar" : "Adicionar"} onPress={editedTask ? editTask : addTask} />
              <Button title="Cancelar" onPress={toggleModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  addButton: {
    backgroundColor: '#6a1b9a',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 2,
    marginTop: 20,
  },
  taskCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  taskDate: {
    fontSize: 14,
    color: '#666',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default HomeScreen;
