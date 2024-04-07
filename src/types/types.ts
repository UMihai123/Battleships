import { InputModeOptions } from "react-native";

export type RootStackParamList = {
    Home: undefined,
    Login: undefined,
    Register: undefined,
    UserDetails: undefined
  };

export interface CustomInputProps {
    label: string,
    value: string,
    onValueChanged: (text: string) => void,
    inputType: InputModeOptions,
    secureText: boolean
}

export interface User {
    userId: string,
    exp: string
}