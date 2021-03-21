import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Clipboard,
  Alert,
  Share,
} from "react-native";
import Slider from "@react-native-community/slider";
import SegmentedControl from "@react-native-community/segmented-control";

let charsetlow = "abcdefghijklmnopqrstuvwxyz";
let charsetup = "ABCDEFGHIJKLMNOPQRSTUVWYXZ";
let charnum = "1234567890";
let charspec = "!@#$%&*()-_=";

export default function App() {
  const [password, setPassword] = useState("");
  const [size, setSize] = useState(16);
  const [texto, setTexto] = useState("Senha Alfanumérica");
  const [minimumValue, setMinimumValue] = useState(8);
  const [maximumValue, setMaximumValue] = useState(23);
  const [index, setIndex] = useState(0);
  
  const copyToClipboard = () => {
    if (password === "") {
    } else {
      Clipboard.setString(password);
      Alert.alert("", "Senha " + password + " copiada com sucesso!");
    }
  };

  function generatePass() {
    let pass = "";
    for (let i = 0; i < size; i++) {
      if (pass.length < size && index === 0) {
        pass += charsetlow.charAt(
          Math.floor(Math.random() * charsetlow.length)
        );
      }

      if (pass.length < size && index === 0) {
        pass += charsetup.charAt(Math.floor(Math.random() * charsetup.length));
      }

      if (pass.length < size) {
        pass += charnum.charAt(Math.floor(Math.random() * charnum.length));
      }

      if (pass.length < size && index === 0) {
        pass += charspec.charAt(Math.floor(Math.random() * charspec.length));
      }
    }
    setPassword(pass);
  }

  const onShare = async () => {
    if (password === "") {
    } else {
      try {
        const result = await Share.share({
          message:
            "Sugestão de senha gerada pelo Gerador de Senhas Seguras: " +
            password,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("./src/assets/logo.png")} style={styles.logo} />

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000"
          value={size}
          onValueChange={(valor) => setSize(valor.toFixed(0))}
          thumbTintColor="#000"
        />
      </View>

      <View style={styles.rowAlign}>
        <SegmentedControl
          style={styles.segmentedControl}
          tintColor="#FFA200"
          values={["", ""]}
          selectedIndex={index}
          onChange={(event) => {
            setIndex(event.nativeEvent.selectedSegmentIndex);

            if (index == 0) {
              setMinimumValue(4);
              setMaximumValue(23);
              setSize(14);
              setTexto("Senha Numérica");
            }

            if (index == 1) {
              setMinimumValue(8);
              setMaximumValue(23);
              setSize(16);
              setTexto("Senha Alfanumérica");
            }
          }}
        />

        <View style={{ flex: 0.86, marginLeft: 10, marginRight: 5 }}>
          <Text style={styles.title}> {texto} </Text>
          <Text style={styles.subTitle}> {size} Caracteres </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      <View style={styles.area}>
        <Text style={styles.password} onLongPress={copyToClipboard}>
          {password}
        </Text>
      </View>

      <View style={styles.rowAlign}>
        <TouchableOpacity onPress={copyToClipboard}>
          <Image
            source={require("./src/assets/copy.png")}
            style={styles.buttonAction}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={onShare}>
          <Image
            source={require("./src/assets/share.png")}
            style={styles.buttonAction}
          ></Image>
        </TouchableOpacity>
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
    marginTop: 30,
    marginBottom: 40,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  subTitle: {
    fontSize: 15,
  },

  area: {
    marginTop: 25,
    marginBottom: 10,
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
  },

  buttonText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },

  password: {
    padding: 10,
    textAlign: "center",
    fontSize: 20,
  },

  rowAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonAction: {
    marginLeft: 10,
    marginRight: 10,
    width: 50,
    height: 50,
  },

  segmentedControl: {
    marginBottom: 20,
    width: 80,
    height: 40,
  },
});
