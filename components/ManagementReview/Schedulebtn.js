import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import Scheduleform from "./Scheduleform";
import { colorPallate } from "../GlobalStyleVars";
function ScheduleBtn({ addSchedule }) {
  const [formOpen, setFormOpen] = useState(false);

  function formClose() {
    setFormOpen(false);
    console.log("fired add form");
  }

  return (
    <View style={styles.container}>
      <Modal visible={formOpen} animationType={"fade"}>
        <View style={styles.formtop}>
          <TouchableOpacity onPress={() => setFormOpen(false)}>
            <Entypo
              name="chevron-left"
              size={24}
              color={colorPallate.white}
              style={styles.backbtn}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: colorPallate.white }}>
            Schedule Review
          </Text>
        </View>

        <ScrollView style={styles.modal}>
          <Scheduleform formClose={formClose} addSchedule={addSchedule} />
        </ScrollView>
      </Modal>

      <View style={styles.btn}>
        <Text style={styles.text}>Schedule Review</Text>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => setFormOpen(true)}
        >
          <Ionicons
            name="ios-add-circle"
            size={35}
            color={colorPallate.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backbtn: {
    margin: 15,
    alignSelf: "center",
  },
  container: {
    padding: 10,
    backgroundColor: colorPallate.theme,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: "center",
    alignSelf: "flex-start",
  },

  formtop: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorPallate.theme,
  },
  modal: {
    backgroundColor: colorPallate.primary,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    fontSize: 18,
    color: colorPallate.primary,
  },
  centeralign: {
    marginVertical: "auto",
  },
});

export default ScheduleBtn;
