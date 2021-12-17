import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./BlockRGB";
//import { TouchableOpacity } from "react-native-gesture-handler";

function HomeScreen({ navigation }) {
 const [colorArray, setColorArray] = useState([
  //Initial value is an array of objects 
  { red: 255, green: 0, blue: 0, id: "0" },
   { red: 0, green: 255, blue: 0, id: "1" },
   { red: 0, green: 0, blue: 255, id: "2" },
 ]);
 useEffect(() => {
   navigation.setOptions({
     headerRight: () => <Button onPress={addColor} title="Add Color" />
   });
 });
 // {item} refers to a single item you pass in
 // eg. {item} = {red:255, green:0, blue: 0, id: "0"}
 function renderItem({ item }) {
   // eg. {item} = {red:255, green:0, blue: 0, id: "0"}
   // item.red = 255
   // item.green = 0
   // item.blue = 0
   return ( 
   <TouchableOpacity onPress={() => navigation.navigate("DetailsScreen")}>
   <BlockRGB red={item.red} green={item.green} blue={item.blue} />
   </TouchableOpacity>
   );
 }

 function addColor() {
   // ... dots means spread operator. eg.
   // list = [1, 2, 3]
   // new list = [...list, 4]
   // which is the same as newList = {1, 2, 3, 4}
  setColorArray([
    ...colorArray,
    // Add a new object
    {
      // eg. Math.random() give a value from 0 to 1 i.e. 0.8, 0.4
      // eg. 0.4 * 256 = 12.8
      // eg. Math.floor(12.8) = 12
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: `${colorArray.length}`,
    },
  ]);
}
  function reset() {
    //navigation.navigate("")
    setColorArray([])
  }

 return (
    <View style={styles.container}>
  
      <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={addColor}
      >
        <Text style={{ color: "red" }}>Add colour</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{ height: 40, justifyContent: "center" }}
        onPress={reset}
      >
        <Text style={{ color: "red" }}>Reset</Text>
      </TouchableOpacity>
      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
    </View>
  );
 
}

function DetailsScreen({ route }) {
  // Destructure this object so we don't have to type route.params.red etc
  const { red, green, blue } = route.params;
 
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
      ]}
    >
      <View style={{ padding: 30 }}>
        <Text style={styles.detailText}>Red: {red}</Text>
        <Text style={styles.detailText}>Green: {green}</Text>
        <Text style={styles.detailText}>Blue: {blue}</Text>
      </View>
    </View>
  );
 }
 

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Colour List" component={HomeScreen} />
       <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
 },
 list: {
   width: "100%",
 },
 detailText: {
   fontsize:24,
   marginBottom:20,
 },
});

