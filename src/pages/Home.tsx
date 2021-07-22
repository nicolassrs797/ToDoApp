import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number,
  taskNewTitle: string
};

export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let conf = tasks.find(task => task.title === newTaskTitle);
    if(conf){
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome."
      );
      return
    }
    let data ={
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };
    setTasks(oldTasks => [...oldTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    let updateTasks = tasks.map(tasks => ({...tasks}));
    let taskOnChange = updateTasks.find(task => task.id === id);
    if(!taskOnChange){
      return;
    } else {
      taskOnChange.done = !taskOnChange.done;
    }
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress : () => {return},
          style: 'cancel'
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldTasks => oldTasks.filter(
              task => task.id != id
            ));
          }
        }
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle}: EditTaskArgs){
    let updateTasks = tasks.map(tasks => ({...tasks}));
    let taskOnChange = updateTasks.find(task => task.id === taskId);
    if(!taskOnChange){
      return;
    } else {
      taskOnChange.title = taskNewTitle;
    }
    setTasks(updateTasks);
  };

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