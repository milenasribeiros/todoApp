import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import StudyCardsContext from '../contexts/StudyCardsContext'

const TasksDueSoonScreen = () => {

    const { cards } = useContext(StudyCardsContext)

    const today = new Date()
    const dueSoonCards = cards.filter(card => {
        const dueDate = new Date(card.dueDate)
        const diffInDays = (dueDate - today) / (1000 * 60 * 60 * 24)
        return diffInDays >= 0 && diffInDays <= 15
    })

    const renderCard = ({ item }) => {
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Data/Hora Término: {new Date(item.dueDate).toLocaleString()}</Text>
        </View>
    }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks a Vencer nos Próximos 15 Dias</Text>
      <FlatList
        data={dueSoonCards}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCard}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f8ff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        margin: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default TasksDueSoonScreen