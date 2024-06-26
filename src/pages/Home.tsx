import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../types/types"
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<
  RootStackParamList
>;

type Props = {
  navigation: NavigationProp;
};

export default function Home({ navigation }: Props) {
    const [isUserLoggedIn, onLoginStatusChanged] = useState(false);

    useFocusEffect(
        useCallback(() => {
            var userId = AsyncStorage.getItem("userId")
            if (userId != null) {
                var exp = AsyncStorage.getItem("exp")
                exp.then((exp) => {
                    if (exp != null){
                        if (parseInt(exp) > Date.now() / 1000) {
                            console.log("Logged In!")
                            onLoginStatusChanged(true);
                        }
                    }
                })
            }
        }, [])
    );

    return (
      <View style={styles.container}>
        <img style={styles.image}
             src="./assets/logo.png" />
        <Text>
          Welcome to Battleships
        </Text>
        {
            isUserLoggedIn === true ?
            <Button title="View user details"
                    onPress={() => navigation.navigate("UserDetails")}/>
            :
            <>
                <Button title="Login"
                        onPress={() => navigation.navigate("Login")} />
                <Button title="Register"
                        onPress={() => navigation.navigate("Register")} />
            </>
        }
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    image: {
        width: 200,
        height: 'auto'
    },
});