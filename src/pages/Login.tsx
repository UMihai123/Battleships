import { StyleSheet, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from "../types/types";
import CustomInput from '../components/CustomInput';
import { Endpoints } from '../constants/Endpoints';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

type NavigationProp = StackNavigationProp<
  RootStackParamList
>;

type Props = {
  navigation: NavigationProp;
};

function onLogin(email: string, password: string, navigation: NavigationProp) {
    axios.post(Endpoints.Login, {
        email: email,
        password: password
    })
    .then(function (response) {
        var user = jwtDecode<User>(response.data.accessToken);
        AsyncStorage.setItem("token", response.data.accessToken)
        AsyncStorage.setItem("userId", user.userId).then(() => {
            AsyncStorage.setItem("exp", user.exp).then(() => {
                navigation.navigate("Home")
            });
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}

export default function Login({ navigation }: Props) {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    return (
        <View style={styles.container}> 
            <CustomInput label="Email:"
                         secureText={false}
                         inputType="email"
                         onValueChanged={onChangeEmail}
                         value={email} />
            <CustomInput label="Password:"
                         inputType='text'
                         secureText={true}
                         onValueChanged={onChangePassword}
                         value={password} />
            <Button title="Login"
                    onPress={() => onLogin(email, password, navigation)} />
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
    }
});