const CardEditScreen = ({route, navigation}) => {
    const {id} =route.params || {};
    const {cards, addCard, updateCard} = useContext()
    const card = cards.find(c=> c.id === id) || {}
}