import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import theme from "../../assets/themes/index";
import albumPage from "../../assets/data/albumPage";
import Card from "./reusable/Card";
import Separator from "./reusable/Separator";

const Albums = ({ navigation }) => {
  return (
    <View>
      <>
        <ScrollView>
          <View style={styles.albumContainer}>
            {albumPage.map((item, index) => (
              <View key={index}>
                <Card item={item} navigation={navigation} />
                {index === 1 && <Separator></Separator>}
              </View>
            ))}
          </View>
        </ScrollView>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    marginBottom: theme.spacing.l,
  },
});

export default Albums;
