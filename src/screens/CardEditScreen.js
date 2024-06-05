import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker'
import StudyCardsContext from '../contexts/StudyCardsContext'
import DateTimePickerModal from 'react-native-modal-datetime-picker'


const CardEditScreen = ({route, navigation}) => {
    const {id} =route.params || {};
    const {cards, addCard, updateCard} = useContext(StudyCardsContext)
    const card = cards.find(c=> c.id === id) || {}

    const [title, setTitle] = useState(card.title || '')
    const [notes, setNotes] = useState(card.notes || '')
    const [status, setStatus] = useState(card.status || 'backlog')
    const [dueDate, setDueDate] = useState(card.dueDate ? new Date(cardDate) : new Date())
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

    useEffect(() => {
        if(id){
            setTitle(card.title)
            setStatus(card.status)
            setNotes(card.notes)
            setDueDate(new Date(card.dueDate))
        }
    }, [id, card])

    const handleSave = () => {
        const cardData = {title, notes, status, dueDate : dueDate.toISOString()}

        if(id){
            updateCard(id, cardData)
        } else {
            addCard(cardData)
        }

        navigation.goBack()
    }
    const showDatePicker = () => {
        setDatePickerVisible(true)
      }
  
      const hideDatePicker = () => {
        setDatePickerVisible(false)
      }
  
      const handleConfirm = (date) => {
        setDueDate(date)
        hideDatePicker()
      }
  
      const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
  
  
    return (
      <View style={styles.container}>
              <Text style={styles.label}>Título:</Text>
              <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Título do Card..."
              />
              <Text style={styles.label}>Notas:</Text>
              <TextInput
                  style={styles.input}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Insira uma descrição..."
                  multiline
              />
              <Text style={styles.label}>Data/Hora de Término:</Text>
              <Button title="Escolhar Data" onPress={showDatePicker} color="#32cd32" />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <Text style={styles.selectedDateLabel}>Data selecionada: {formatDate(dueDate)}</Text>
  
              <Text style={styles.label}>Status:</Text>
              <Picker
                  selectedValue={status}
                  style={styles.input}
                  onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
                  <Picker.Item label="Backlog" value="backlog" />
                  <Picker.Item label="Em Progresso" value="in_progress" />
                  <Picker.Item label="Concluído" value="done" />
              </Picker>
              <Button title="Salvar" onPress={handleSave} color="#32cd32" />
          </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    selectedDateLabel: {
        fontSize: 16,
        marginBottom: 15,
        color: '#555555',
    },
    input: {
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: '100%',
    }
  });
  
  export default CardEditScreen