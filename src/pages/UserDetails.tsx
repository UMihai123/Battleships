import { Endpoints } from "../constants/Endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";

export default function UserDetails() {
    useEffect(() => {
        var token = AsyncStorage.getItem("token");
        token.then((token) => {
            axios.get(Endpoints.GetUserDetails, {
                headers: { Authorization: `Bearer ${token}`}
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }, []);
    return (<></>);
}