import React, { useState, useEffect } from "react";
import { View, StatusBar, FlatList, Alert, StyleSheet } from "react-native";
import styled from "styled-components";
import AddInput from "./components/AddInput";
import TodoList from "./components/TodoList";
import Empty from "./components/Empty";
import Header from "./components/Header";
import firestore, { firebase } from '@react-native-firebase/firestore';

export default function App() {
  const [data, setData] = useState([]);

  const submitHandler = (value, date) => {
    firestore()
      .collection('ADDTASK')
      .add({
        value: value,
        date: date.toUTCString().slice(4, 16),
        key: Math.random().toString(),
      })
      .then(() => {
        Alert.alert('The information was sent successfully.')
      })
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ADDTASK')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            value: '',
            date: '',
            ...documentSnapshot.data()
          };
        });
        setData(data);
      });
    return () => unsubscribe();
  },[]);

  // firestore()
  //   .collection('ADDTASK')
  //   .doc(key)
  //   .delete()
  //   .then(()=>{
  //     Alert.alert('Are your sure ?')
  //   });

  const deleteItem = (key) => {
    return Alert.alert(
      "Are your sure?",
      "If you delete this data, it cannot be recovered.",
      [
        {
          text: "Yes",
          onPress: () => {
             console.log(key)
              firebase.firestore().collection('ADDTASK').doc(key)
              .delete().then(('The information was delete successfully.'))
          },
        },
        {
          text: "No",
        },
      ],
    );
    // console.log(key)
    // const dbRef = firebase.firestore().collection('ADDTASK').doc(key)
    // dbRef.delete().then((res))
    // Alert.alert("Are your sure?")
  };

  const searchItem = (keyword) => {

  }

  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#80BA9D" />
      </View>
      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header searchItem={searchItem} />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={deleteItem} />
          )}
        />
        <View>
          <AddInput submitHandler={submitHandler} />
        </View>
      </View>
    </ComponentContainer>
  );
}




const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const ComponentContainer = styled.View`
  background-color: #80BA9D;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;