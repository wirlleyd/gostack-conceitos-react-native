import React, {useState, useEffect} from "react";
import api from './services/api'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

/*
id: repositoryId,
title: "Desafio React Native",
url: "https://github.com/josepholiveira",
techs: ["React Native", "Node.js"],
likes: 1,
*/
export default function App() {
  const [repositorys, setRepositories] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await api.get('/repositories')
      setRepositories(data)
    };
    fetchApi()
  }, [])

  async function handleLikeRepository(id) {
    const repository = repositorys.find(repository => repository.id === id);
    repository.likes += 1;
    const newrepositoryList = [...repositorys.filter(repository => repository.id !== id), repository];
    setRepositories(newrepositoryList);
  }

  const getLikeString = (likes) => {
    if (likes <= 1) {
      return "curtida"
    }
    return "curtidas"
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repositorys.map(repository => 
          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repository.title}</Text>

            {repository.techs.map(tech => 
              <View style={styles.techsContainer}>
                <Text style={styles.tech}>
                  {tech}
                </Text>
              </View>
            )}

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${repository.id}`}
              >
                {`${repository.likes} ${getLikeString(repository.likes)}`}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(repository.id)}
              testID={`like-button-${repository.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
