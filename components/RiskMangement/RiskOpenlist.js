import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AddRiskbtn from "./AddRiskbtn";
import { Feather, Fontisto, AntDesign, Ionicons } from "@expo/vector-icons";
import DetailView from "./DetailView";
import { colorPallate } from "../GlobalStyleVars";

function ListItem({ risk, updateRisk, formTitle, addRisk, AcceptRiskList }) {
  let [detailOpen, setDetailOpen] = useState(false);

  function closeDetailView() {
    setDetailOpen(false);
  }

  return (
    <View style={styles.Litem}>
      {/* <Modal visible={detailOpen} animationType={"slide"}>
        <View style={{ flex: 1, backgroundColor: "#F2FFFE" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.listback}
              onPress={() => {
                setDetailOpen(false);
                console.log("detail view");
              }}
            >
              <Text style={{ fontSize: 16, color: "white" }}>Back to list</Text>
              <AntDesign
                name="back"
                size={24}
                color="#1B4965"
                style={{ marginHorizontal: 9 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#1B4965",
                marginHorizontal: 10,
              }}
            >
              {formTitle}
            </Text>
          </View>
          <ScrollView style={styles.detailContainer}>
             <DetailView
            risk={risk}
            updateRisk={updateRisk}
            addRisk={addRisk}
            closeDetailView={closeDetailView}
            formTitle={formTitle}
            AcceptRiskList={AcceptRiskList}
          />
          </ScrollView>
        </View>
      </Modal> */}

      {detailOpen && (
        <ScrollView style={[{}]}>
          <TouchableOpacity
            style={styles.listback}
            onPress={() => {
              setDetailOpen(false);
              console.log("detail view");
            }}
          >
            {/* <Text style={{ fontSize: 16, color: "white" }}>Back </Text> */}

            <Feather
              name="minimize"
              size={24}
              color={colorPallate.secondary}
              style={{ marginHorizontal: 9 }}
            />
          </TouchableOpacity>
          <DetailView
            risk={risk}
            updateRisk={updateRisk}
            addRisk={addRisk}
            closeDetailView={closeDetailView}
            formTitle={formTitle}
            AcceptRiskList={AcceptRiskList}
          />
        </ScrollView>
      )}

      {!detailOpen && (
        <>
          <View style={[styles.row, { alignItems: "center" }]}>
            <Text style={styles.risktitle}>{risk.item.risk}</Text>
            <AntDesign
              name="warning"
              size={20}
              color={colorPallate.red}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <View style={[styles.row]}>
            <Text style={styles.level}>
              Consequences: {risk.item.consequence}
            </Text>
            <Text style={styles.level}>Likelihood: {risk.item.likelyhood}</Text>
          </View>
          <View
            style={[styles.row, { marginVertical: 7, alignItems: "center" }]}
          >
            <Fontisto name="clock" size={20} color={colorPallate.theme} />
            <Text style={{ marginHorizontal: 10 }}>
              Raised on: {risk.item.submission}
            </Text>
            <TouchableOpacity
              style={styles.details}
              onPress={() => setDetailOpen(true)}
            >
              <Text style={styles.detailsText}>Details</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

function ListItemClosed({ risk, updateRisk, formTitle, updateAcceptRiskList }) {
  let [detailOpen, setDetailOpen] = useState(false);

  return (
    <View style={styles.Litem}>
      <Modal visible={detailOpen} animationType={"fade"}>
        <View style={{ flex: 1, backgroundColor: colorPallate.primary }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.listback}
              onPress={() => setDetailOpen(false)}
            >
              <AntDesign
                name="back"
                size={24}
                color={colorPallate.white}
                style={{ marginHorizontal: 9 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colorPallate.theme,
                marginHorizontal: 10,
              }}
            >
              {formTitle}
            </Text>
          </View>
          <ScrollView style={{}}>
            <DetailView
              risk={risk}
              formTitle={formTitle}
              updateRisk={updateRisk}
              updateAcceptRiskList={updateAcceptRiskList}
            />
          </ScrollView>
        </View>
      </Modal>

      <View style={[styles.row]}>
        <Text style={styles.risktitle}>{risk.item.risk}</Text>

        {risk.item.mitigated && (
          <Ionicons
            name="md-checkbox-outline"
            size={20}
            color={colorPallate.lightGreen}
            style={{ marginVertical: 7, marginLeft: "auto" }}
          />
        )}
      </View>
      <View style={[styles.row]}>
        <Text style={styles.level}>Consequences: {risk.item.consequence}</Text>
        <Text style={styles.level}>Likelihood: {risk.item.likelyhood}</Text>
      </View>
      <View style={[styles.row, { marginVertical: 7, alignItems: "center" }]}>
        <Fontisto name="clock" size={20} color={colorPallate.theme} />
        <Text style={{ marginHorizontal: 5 }}>
          Closed on: {risk.item.closed}
        </Text>
        <TouchableOpacity
          style={styles.details}
          onPress={() => setDetailOpen(true)}
        >
          <Text style={styles.detailsText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OpenList({ risks, updateRisk, formTitle, addRisk, AcceptRiskList }) {
  return (
    <View style={styles.list}>
      <AddRiskbtn addRisk={addRisk} formTitle={formTitle} />
      <FlatList
        data={risks}
        renderItem={(risk) => (
          <ListItem
            key={risk.item.key}
            risk={risk}
            updateRisk={updateRisk}
            formTitle={formTitle}
            addRisk={addRisk}
            AcceptRiskList={AcceptRiskList}
          />
        )}
      />
    </View>
  );
}

function ClosedList({ closedRisks, updateRisk, formTitle, addRisk }) {
  return (
    <View style={styles.list}>
      <FlatList
        data={closedRisks}
        renderItem={(risk) => (
          <ListItemClosed
            key={risk.item.key}
            risk={risk}
            updateRisk={updateRisk}
            formTitle={formTitle}
          />
        )}
      />
    </View>
  );
}

function AcceptedList({
  closedRisks,
  acceptRisk,
  formTitle,
  updateAcceptRiskList,
}) {
  return (
    <View style={styles.list}>
      <FlatList
        data={closedRisks}
        renderItem={(risk) => (
          <ListItemClosed
            key={risk.item.key}
            risk={risk}
            acceptRisk={acceptRisk}
            formTitle={formTitle}
            updateAcceptRiskList={updateAcceptRiskList}
          />
        )}
      />
    </View>
  );
}

function RiskopenList({ formTitle }) {
  const [risks, setRisks] = useState([
    {
      key: (Math.random() - Math.random()).toString(),
      risk: "Risk title will be here",
      assets: "Asset title here",
      addInventory: true,
      detail: `This is the demo for the risk detail. Customers will write short descriptions on the risk form. This will show here.`,
      mitigation: `Controls and  mitigations for the will be displayed here. This is also dinamically added for the risk form.`,
      consequence: 4,
      likelyhood: 3,
      submission: "03 August 2020",
      closed: "",
      accepted_on: "",
      mitigated: false,
      owner: "Name that was added",
      closed_by: "",
      accepted_by: "",
      acceptance_rational: "",
      decession_maker: "",
      accepted: false,
      asset_tag: "Tag name",
    },
  ]);
  // console.log(formTitle);
  const [closedRisks, setClosedRisks] = useState([
    {
      key: (Math.random() - Math.random()).toString(),
      risk: "Risk title that are Closed",
      assets: "Asset title here",
      addInventory: true,
      detail: `This view demonstrates the risk that were previously added and closed by checking the tikbox. These are just the records for the previously assessed risk`,
      mitigation: `Controls and  mitigations for the will be displayed here. This is also dinamically added for the risk form.`,
      consequence: 1,
      likelyhood: 1,
      submission: "3 August 2020",
      closed: "10 August 2020",
      accepted_on: "",
      mitigated: true,
      owner: "Name that was added",
      closed_by: "",
      accepted_by: "",
      acceptance_rational: "",
      decession_maker: "",
      accepted: false,
      asset_tag: "Tag name",
    },
  ]);

  const [acceptdRisks, setAcceptedRisks] = useState([
    {
      key: (Math.random() - Math.random()).toString(),
      risk: "Risk title that are accepted",
      assets: "Asset title here",
      addInventory: true,
      detail: `This view demonstrates the risk that were previously added and closed by checking the tikbox. These are just the records for the previously assessed risk`,
      mitigation: `Controls and  mitigations for the will be displayed here. This is also dinamically added for the risk form.`,
      consequence: 1,
      likelyhood: 1,
      submission: "3 August 2020",
      closed: "10 August 2020",
      accepted_on: "13 August 2020",
      mitigated: false,
      owner: "Name that was added",
      closed_by: "",
      accepted_by: "",
      acceptance_rational: "",
      decession_maker: "",
      accepted: true,
      asset_tag: "Tag name",
    },
  ]);
  let [activeRisk, setActiveRisk] = useState(true);
  useEffect(() => {
    console.log("Risk Added");
  }, [risks]);
  const handleRiskTabs = {
    activateRisks: () => {
      setActiveRisk(true);
      // console.log(activeRisk);
    },
    activateClosedRisks: () => {
      setActiveRisk(false);
      // console.log(activeRisk);
    },
  };

  const addRisk = (risk) => {
    setRisks((currentRisks) => {
      let found = currentRisks.find((item) => item.key == risk.key);
      // console.log("Found :", found);
      if (found == undefined) return [...currentRisks, risk];
      else
        return currentRisks.map((item) => (item.key == risk.key ? risk : item));
    });
    console.log(risks);
  };
  const updateRisk = (risk) => {
    setRisks((currentRisks) => {
      return currentRisks
        .map((riskitem) => (riskitem.key == risk.key ? risk : riskitem))
        .filter((riskitem) => riskitem.mitigated == false);
    });
    setClosedRisks((currentRisks) => {
      // risk.key = Math.random() + Math.random();
      // console.log(risk.key);
      return [...currentRisks, risk];
    });
    console.log(closedRisks);
  };
  const AcceptRiskList = (risk) => {
    setRisks((currentRisks) => {
      return currentRisks
        .map((riskitem) => (riskitem.key == risk.key ? risk : riskitem))
        .filter((riskitem) => riskitem.accepted == false);
    });
    setAcceptedRisks((currentRisks) => {
      return [...currentRisks, risk];
    });
  };
  const updateAcceptRiskList = (risk) => {
    setAcceptedRisks((currentRisks) => {
      return currentRisks
        .map((riskitem) => (riskitem.key == risk.key ? risk : riskitem))
        .filter((riskitem) => riskitem.mitigated == false);
    });
    setClosedRisks((currentRisks) => {
      return [...currentRisks, risk];
    });
  };
  const Tab = createMaterialTopTabNavigator();
  console.log("rendered");
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen
          name="Add"
          children={() => (
            <OpenList
              risks={risks}
              updateRisk={updateRisk}
              formTitle={formTitle}
              addRisk={addRisk}
              AcceptRiskList={AcceptRiskList}
            />
          )}
        />
        <Tab.Screen
          name="Closed"
          children={() => (
            <ClosedList
              closedRisks={closedRisks}
              updateRisk={updateRisk}
              formTitle={formTitle}
              addRisk={addRisk}
            />
          )}
        />
        <Tab.Screen
          name="Accepted"
          children={() => (
            <AcceptedList
              closedRisks={acceptdRisks}
              formTitle={formTitle}
              updateAcceptRiskList={updateAcceptRiskList}
            />
          )}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  addriskbtn: {
    position: "absolute",
    top: 10,
  },
  container: {
    flex: 1,
  },
  details: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    backgroundColor: colorPallate.theme,
    marginLeft: "auto",
    borderRadius: 20,
    alignItems: "center",
  },
  detailContainer: {
    padding: 10,
  },
  detailsText: {
    color: "white",
  },
  risktitle: {
    marginVertical: 7,
    fontSize: 16,
    fontWeight: "bold",
    color: colorPallate.theme,
  },
  row: {
    flexDirection: "row",
  },
  level: {
    marginRight: 30,
  },
  list: {
    paddingTop: 5,
    backgroundColor: colorPallate.primary,
    flex: 1,
  },
  listback: {
    flexDirection: "row",
    backgroundColor: colorPallate.theme,
    alignItems: "center",
    padding: 10,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    alignSelf: "flex-start",
    marginVertical: 10,
  },

  Litem: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 12,
    shadowColor: "#CAE9FF",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
  },
});
export default RiskopenList;
