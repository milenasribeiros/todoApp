const CardListScreen = ({navigation}) => {
    const {cards, deleteCard} = useContext()

    const inProgressCards = cards.filter(card => card.status === 'in-progress')
    const concluidedCards = cards.filter(card => card.status === 'done')
    const backlogCards = cards.filter(card => card.status === 'backlog')

    const today = new Date()
    const dueSoonCards = cards.filter(card => {
        const dueDate = new Date(card.dueDate)
        const diffInDays = (dueDate - today) / (1000 * 60 * 60 * 24)
        return diffInDays >= 0 && diffInDays <= 15
    })

    const renderCard = ({item}) => (
        <View style= {styles.card}>
            <Text style={styles.cardTitle}></Text>
        </View>

    )

}