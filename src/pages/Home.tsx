import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    if (tasks.find(task => task.title === newTaskTitle)){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }

    setTasks([...tasks, { id: new Date().getTime(), title: newTaskTitle, done: false }]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  }

  function handleRemoveTask(id: number) {
    console.log("id removido: ", id);
    Alert.alert(
      "Tem certeza que você deseja remover esse item?",
      "",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => setTasks(tasks.filter(task => task.id !== id)) }
      ]
    )
    
  }

  function handleEditTask(id: number, newTitle: string) {
    setTasks(tasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})