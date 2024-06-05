import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StudyCardsProvider } from "./src/contexts/StudyCardsContext";
import { NavigationContainer } from "@react-navigation/native";
import CardListScreen from "./src/screens/CardListScreen";
import CardEditScreen from "./src/screens/CardEditScreen";
import TasksDueSoonScreen from "./src/screens/TasksDueSoonScreen";

const Stack = createNativeStackNavigator();

const App =() => {
  return(
    <StudyCardsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CardList">
          <Stack.Screen name="CardList" component={CardListScreen} options={{title: 'Study Cards'}} />
          <Stack.Screen name="CardEdit" component={CardEditScreen} options={{title: 'Editar Card'}} />
          <Stack.Screen name="TasksDueSoon" component={TasksDueSoonScreen} options={{title: 'Tasks a Vencer'}} />

        </Stack.Navigator>
      </NavigationContainer>
    </StudyCardsProvider>
  )
}

export default App;
