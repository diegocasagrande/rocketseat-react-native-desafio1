import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'


export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TasksItem({ index, item, toggleTaskDone, removeTask, editTask }: TasksItemProps) {

  const [startEditing, setStartEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setStartEditing(true);
  }

  function handleCancelEditing() {
    setStartEditing(false);
    setTaskTitle(item.title);
  }

  function handleSubmitEditing() {
    editTask(item.id, taskTitle);
    setStartEditing(false);
  } 
  
  useEffect(() => {
    if (textInputRef.current) {
      if (startEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [startEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={[styles.taskMarker, item.done && styles.taskMarkerDone]}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            style={[styles.taskText, item.done && styles.taskTextDone]}
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={startEditing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {startEditing ? (
          <TouchableOpacity 
            style={styles.touchSpace}
            onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.touchSpace}
            onPress={handleStartEditing}>
            <Image source={editIcon} style={styles.image} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          style={styles.touchSpace}
          disabled={startEditing}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: startEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  touchSpace: {
    paddingHorizontal: 15,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
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
  iconsDivider: { 
    width: 1,
    height: 24,
    backgroundColor: '#B2B2B2',
  },
  iconsContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    },
  image: {
    opacity: 0.2,
    height: 20,
    width: 20,
  },
})