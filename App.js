import React, { useState } from "react";
import { 
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Clipboard,
  Alert,
} from "react-native";
import Slider from "@react-native-community/slider";

let charsetlow = "abcdefghijklmnopqrstuvwxyz";
let charsetup = "ABCDEFGHIJKLMNOPQRSTUVWYXZ";
let charnum = "1234567890";
let charspec = "!@#$%&*()-_=";

export default function App() {
  const [password, setPassword] = useState("");
  const [size, setSize] = useState(16);

  const copyToClipboard = () => {
    Clipboard.setString(password);
    Alert.alert("", "Senha: " + password + " cópiada do com sucesso!");
  };

  function generatePass() {
    let pass = "";
    for (let i = 0; i < size; i++) {
      if (pass.length < size) {
        pass += charsetlow.charAt(
          Math.floor(Math.random() * charsetlow.length)
        );
      }

      if (pass.length < size) {
        pass += charsetup.charAt(Math.floor(Math.random() * charsetup.length));
      }

      if (pass.length < size) {
        pass += charnum.charAt(Math.floor(Math.random() * charnum.length));
      }

      if (pass.length < size) {
        pass += charspec.charAt(Math.floor(Math.random() * charspec.length));
      }
    }

    setPassword(pass);
  }

  return (
    <View style={styles.container}>
      <Image source={require("./src/assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}> {size} Caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={8}
          maximumValue={23}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000"
          value={size}
          onValueChange={(valor) => setSize(valor.toFixed(0))}
          thumbTintColor="#000"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      <View style={styles.area}>
        <Text style={styles.password} onLongPress={copyToClipboard}>
          {password}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F3FF",
  },

  logo: {
    marginBottom: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  area: {
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: "#FFF",
    width: "90%",
    borderRadius: 7,
  },

  button: {
    backgroundColor: "#FFA200",
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginBottom: 10,
  },

   buttonText:{
    fontSize: 20,
    color: '#FFF',
    fontWeight:'bold',

   },
   

  password: {
    padding: 10,
    textAlign: "center",
    fontSize: 20,
  },
});
