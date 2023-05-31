import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const chats = [
    {
      title: "Marcos",
      headshot:
        "https://i1.wp.com/files.agro20.com.br/uploads/2019/10/vaca-2.jpg?fit=1024%2C681&ssl=1",
      lastMessage: "Olá, tudo bem?",
      date: "Mar 3",
    },
    {
      title: "Fernando",
      headshot: null,
      lastMessage: "Olá, tudo bem?",
      date: "Mar 3",
    },
    {
      title: "Maria",
      headshot: null,
      lastMessage: "Olá, tudo bem?",
      date: "Mar 3",
    },
    {
      title: "Camila Vargas",
      headshot:
        "https://img.freepik.com/fotos-gratis/estilo-de-vida-beleza-e-moda-conceito-de-emocoes-de-pessoas-jovem-gerente-de-escritorio-feminino-asiatico-ceo-com-expressao-satisfeita-em-pe-sobre-um-fundo-branco-sorrindo-com-os-bracos-cruzados-sobre-o-peito_1258-59329.jpg",
      lastMessage: "Olá, tudo bem?",
      date: "Yesterday",
    },
    {
      title: "Carlos Henrique",
      headshot:
        "https://conteudo.imguol.com.br/c/entretenimento/36/2022/05/22/gata-tricolor-gato-gatos-1653265224214_v2_3x4.jpg",
      lastMessage:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.",
      date: "Mar 10",
    },
  ];

  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <StatusBar style="auto" />

      {/* Navbar */}
      <View style={navbar.container}>
        <Text style={navbar.title}>CHATTER</Text>
        <View style={navbar.iconsWrapper}>
          <TouchableOpacity
            onPress={() => {
              setShowSearch(!showSearch);
            }}
          >
            <Image
              style={navbar.search}
              source={require("../../assets/search.png")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={navbar.menu}
              source={require("../../assets/menu.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chats */}
      <View style={styles.container}>
        {showSearch && (
          <TextInput
            style={navbar.input}
            placeholder="Pesquisar..."
            // onSubmitEditing={Keyboard.dismiss}
          />
        )}
        <FlatList
          data={chats}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={chat.container}>
                <Image
                  source={
                    item.headshot
                      ? { uri: item.headshot }
                      : require("../../assets/user.jpg")
                  }
                  style={{ width: 50, height: 50, borderRadius: 100 }}
                />
                <View style={chat.data}>
                  <View style={chat.header}>
                    <Text style={chat.name} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={chat.date}>{item.date}</Text>
                  </View>
                  <Text numberOfLines={1} style={chat.message}>
                    {item.lastMessage}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

const chat = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "gray",
  },
  data: {
    width: Dimensions.get("window").width - 90,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    marginRight: 15,
    flex: 1,
    fontSize: 16,
  },
  date: {
    fontSize: 13,
    color: "#393939",
  },
  message: {
    color: "#393939",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
  input: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderRadius: 4,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderColor: "#7c58e6",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#7c58e6",
  },
  iconsWrapper: {
    flexDirection: "row",
  },
  search: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  menu: {
    width: 10,
    height: 30,
  },
});
