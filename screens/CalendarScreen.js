import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
};
LocaleConfig.defaultLocale = 'pt-br';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

  useEffect(() => {
    retrieveTasks();
  }, []);

  const retrieveTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Erro ao recuperar tarefas: ', error);
    }
  };

  const storeTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks); // Atualiza as tarefas
    } catch (error) {
      console.error('Erro ao armazenar tarefas: ', error);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);

    const tasksForSelectedDate = tasks.filter(task => task.date === day.dateString);
    setTasksForSelectedDate(tasksForSelectedDate);
  };

  // Marcando os dias com tarefas
  const markedDates = tasks.reduce((obj, task) => {
    obj[task.date] = { selected: true, selectedColor: '#6a1b9a' };
    return obj;
  }, {});

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates} // Apenas os dias com tarefas são marcados
        locale="pt-br"
      />

      <View style={styles.tasksContainer}>
        <Text style={styles.title}>Tarefas para {selectedDate}</Text>
        <FlatList
          data={tasksForSelectedDate}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma tarefa agendada para este dia</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  tasksContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#999',
  },
});

export default CalendarScreen;
