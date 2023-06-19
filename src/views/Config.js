import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Buffer } from "buffer";
import axios from "axios";
import { SvgXml } from "react-native-svg";
import { decode, encode } from "base-64";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function Config() {
  const [avatar, setAvatar] = useState();
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const navigation = useNavigation();

  const api = "https://api.multiavatar.com";

  useEffect(() => {
    getLocalAvatar();
  }, []);

  async function getLocalAvatar() {
    try {
      const value = await AsyncStorage.getItem("avatar");
      if (value !== null) {
        setAvatar(value);
      } else {
        setLoadingAvatar(true);
        getAvatar();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAvatar() {
    await axios
      .get(`${api}/${Math.round(Math.random() * 1000)}`)
      .then((res) => {
        const buffer = Buffer(res.data);
        const base64 = buffer.toString("base64");
        const DATA_IMAGE = decode(base64);
        setAvatar(DATA_IMAGE);
      })
      .catch((err) => {
        Toast.show({
          type: "success",
          text1: "Oops!",
          text2: "Algo deu errado ao buscar foto",
        });
      })
      .finally(() => setLoadingAvatar(false));
  }

  async function saveAvatar() {
    try {
      await AsyncStorage.setItem("avatar", avatar);
      Toast.show({
        type: "success",
        text1: "Uhuul!",
        text2: "Foto alterada com sucesso",
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "success",
        text1: "Oops!",
        text2: "Algo deu errado ao salvar a foto",
      });
    }
  }

  return (
    <>
      <StatusBar style="auto" />
      <View style={navbar.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image
            style={navbar.menu}
            source={require("../../assets/back.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={config.container}>
        <View style={config.pictureWrapper}>
          {avatar && (
            <SvgXml
              xml={avatar}
              style={{
                width: 200,
                height: 200,
                opacity: loadingAvatar ? 0.3 : 1,
              }}
            />
          )}
          {avatar && (
            <TouchableOpacity
              onPress={() => {
                setLoadingAvatar(true);
                getAvatar();
              }}
              disabled={loadingAvatar}
            >
              <View style={config.roundedBtn}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("../../assets/reload.png")}
                ></Image>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View>
          <TouchableOpacity disabled={loadingAvatar} onPress={saveAvatar}>
            <View style={config.purpleBtn}>
              <Text style={config.purpleBtnText}>SALVAR FOTO</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const navbar = StyleSheet.create({
  container: {
    marginTop: 29,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  menu: {
    width: 20,
    height: 30,
  },
});

const config = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  pictureWrapper: {
    marginTop: 30,
    marginBottom: 60,
  },
  roundedBtn: {
    backgroundColor: "#eceded",
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: "#dadce0",
    borderRadius: 100,
    width: 50,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -10,
    right: 10,
  },
  purpleBtn: {
    backgroundColor: "#7c58e6",
    width: 150,
    paddingVertical: 6,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
  },
  purpleBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
