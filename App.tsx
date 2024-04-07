import Home from "./src/pages/Home.tsx";
import Login from "./src/pages/Login.tsx";
import Register from "./src/pages/Register.tsx";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from "./src/types/types"
import UserDetails from "./src/pages/UserDetails.tsx";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UserDetails" component={UserDetails} options={{title:"User Details"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
