import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, FlatList, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedNote, setEditedNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    retrieveNotes();
  }, []);

  const retrieveNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        const parsedNotes = JSON.parse(storedNotes);
        console.log('Notas recuperadas:', parsedNotes);
        setNotes(parsedNotes);
      }
    } catch (error) {
      console.error('Erro ao recuperar notas:', error);
    }
  };

  const storeNotes = async (notes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      console.log('Notas armazenadas com sucesso:', notes);
    } catch (error) {
      console.error('Erro ao armazenar notas:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setEditedNote(null);
    setNoteTitle('');
    setNoteText('');
  };

  const addNote = () => {
    if (!noteTitle.trim()) return;
    const newNote = { id: Math.random().toString(), title: noteTitle, text: noteText };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    storeNotes(updatedNotes);
    toggleModal();
  };

  const editNote = () => {
    if (!noteTitle.trim()) return;
    const updatedNotes = notes.map(note => {
      if (note.id === editedNote.id) {
        return { ...note, title: noteTitle, text: noteText };
      }
      return note;
    });
    setNotes(updatedNotes);
    storeNotes(updatedNotes);
    toggleModal();
  };

  const deleteNote = async (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    storeNotes(updatedNotes);
  };

  const openEditModal = (note) => {
    setEditedNote(note);
    setNoteTitle(note.title);
    setNoteText(note.text);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openEditModal(item)}>
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.text}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => openEditModal(item)}>
                  <MaterialIcons name="edit" size={24} color="#6a1b9a" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                  <MaterialIcons name="delete" size={24} color="#6a1b9a" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={noteTitle}
              onChangeText={text => setNoteTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Texto"
              value={noteText}
              onChangeText={text => setNoteText(text)}
              multiline
            />
            <View style={styles.buttonContainer}>
              <Button title={editedNote ? "Editar" : "Adicionar"} onPress={editedNote ? editNote : addNote} />
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
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6a1b9a',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
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
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
});

export default NotesScreen;
