import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Albums from "../components/Albums";
import SharedAlbums from "../components/SharedAlbums";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Albums" component={Albums} />
      <Stack.Screen name="SharedAlbums" component={SharedAlbums} />
    </Stack.Navigator>
  );
};

export default Navigator;
