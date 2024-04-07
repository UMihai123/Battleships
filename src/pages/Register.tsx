import { StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from "../types/types";
import CustomInput from '../components/CustomInput';
import { Endpoints } from '../constants/Endpoints';
import axios from "axios";

type NavigationProp = StackNavigationProp<
  RootStackParamList
>;

type Props = {
  navigation: NavigationProp;
};

function onRegister(email: string, password: string) {
    axios.post(Endpoints.Register, {
        email: email,
        password: password
    })
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    });
}

export default function Register({ navigation }: Props) {
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
            <Button title="Register"
                    onPress={() => {onRegister(email, password); navigation.navigate("Login")}} />
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