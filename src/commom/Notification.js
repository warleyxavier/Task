import { Alert } from "react-native";

export default class Notification {

    showError(erro) {
        Alert.alert('Erro', erro);
    }

    showWarning(msg) {
        Alert.alert('Atenção', msg);
    }

}