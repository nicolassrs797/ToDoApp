import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'

import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';

interface TasksItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({taskId, taskNewTitle} : EditTaskArgs) => void;
}

export function TaskItem({task, editTask, toggleTaskDone, removeTask}: TasksItemProps) {

    let [editing, setEditing] = useState(false);
    let [valueEdit, setValueEdit] = useState(task.title);

    let textInputRef = useRef<TextInput>(null);

    function handleStartEdit(){
        setEditing(true);
    };

    function handleCancelEdit(){
        setValueEdit(task.title);
        setEditing(false);
    };

    function handleSubmitEdit(){
        editTask({taskId: task.id, taskNewTitle: valueEdit});
        setEditing(false);
    };

    useEffect(() => {
        if (textInputRef.current) {
          if (editing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [editing])

    return (
        <View
            style={styles.container}
        >
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
              >
                <View 
                  style={task.done === false ? styles.taskMarker : styles.taskMarkerDone}
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput
                    value={valueEdit}
                    ref={textInputRef}
                    onChangeText={setValueEdit}
                    editable={editing}
                    onSubmitEditing={handleSubmitEdit}
                    style={task.done === false ? styles.taskText : styles.taskTextDone}
                    maxLength={18}
                >
                </TextInput>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>

                {
                    editing ? 
                        <TouchableOpacity
                            style={{ paddingHorizontal: 24 }}
                            onPress={handleCancelEdit}
                        >
                            <Icon 
                                name="x"
                                size={24}
                                color="#B2B2B2"
                            />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity
                            style={{ paddingHorizontal: 24 }}
                            onPress={handleStartEdit}
                        >
                            <Icon 
                                name="edit"
                                size={20}
                                color="#B2B2B2"
                            />
                        </TouchableOpacity>
                }

                <View 
                    style={styles.buttonsDivisor}
                />

                <TouchableOpacity
                    disabled={editing}
                    style={{ paddingHorizontal: 24 }}
                    onPress={() => removeTask(task.id)}
                >
                    <Image
                        source={trashIcon}
                        style={{opacity: editing ? 0.2 : 1}}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
};


let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonsDivisor: {
        width: 1,
        height: 24,
        backgroundColor: "rgba(196, 196, 196, 0.24)",
    },
    infoContainer: {
        flex: 1
    }
  })