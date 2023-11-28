import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import {
  Assets,
  Colors,
  Text,
  Image,
  PrimaryButton,
  BottomSheets,
  Input,
  Models,
} from "../../utils/imports.utils";
import {
  Height,
  Width,
  capitalizeFLetter,
  height,
  uploadFile,
  useSetState,
} from "../../utils/function.utils";
import { btnBlue, btnLightBlue, serverUrl } from "../../utils/constant.utils";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function UserCard(props) {
  const { data } = props;

  const filterRef = useRef();

  const [state, setState] = useSetState({
    pdf: {},
    complaint: "",
  });

  const uploadFiles = async () => {
    try {
      const result = await uploadFile();
      console.log("result: ", result);
      if (result) {
        setState({ pdf: result.assets[0] });
      }
      // setState({file:})
    } catch (e) {
      console.log(e);
    }
  };

  const report = async () => {
    try {
      const body = {
        complaint: state.complaint,
        report_file: state.pdf,
      };
      // const formData = new FormData();
      let data = new FormData();
      data.append("complaint", "test");
      data.append("report_file", {
        uri: state.pdf.uri,
        name: state.pdf.name,
        type: state.pdf.mimeType,
      });
      // for (const key in body) {
      //   if (Object.prototype.hasOwnProperty.call(body, key)) {
      //     formData.append(key, body[key]);
      //   }
      // }
      const token = await AsyncStorage.getItem("token");
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${serverUrl()}report_people/${72}/`,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token,
        },
        data: data,
      };

      // const res = await Models.auth.updateProfiles(body);
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });

      // const result = await Models.people.report(data.user, formData);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        backgroundColor: Colors.light,
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "15%", alignItems: "center" }}>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 30,
            overflow: "hidden",
          }}
        >
          <Image
            src={Assets.profile}
            height={"100%"}
            width={"100%"}
            resize="cover"
          />
        </View>
      </View>
      <View style={{ width: "30%", alignItems: "center", padding: 5 }}>
        <Text size={16} color={Colors.Dark} family="regular">
          {capitalizeFLetter(data?.first_name)}
        </Text>
      </View>
      <View
        style={{
          width: "55%",
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <View style={{ width: "50%" }}>
          <PrimaryButton
            text={data?.following ? "Following" : "Follow"}
            height={32}
            width={"100%"}
            family="regular"
            size={18}
            backgroundColor={
              data?.following
                ? [Colors.disabled, Colors.disabled]
                : ["#FF9FC7", "#F32878"]
            }
          />
        </View>
        <View style={{ width: "50%" }}>
          <PrimaryButton
            text={"report"}
            height={32}
            width={"100%"}
            family="regular"
            backgroundColor={btnLightBlue}
            size={18}
            onPress={() => filterRef.current.open()}
          />
        </View>
      </View>

      <BottomSheets
        height={"auto"}
        ref={filterRef}
        renderComponent={() => (
          <View
            style={{ alignItems: "flex-start", width: "100%", padding: 20 }}
          >
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text size={18} color={Colors.Dark} family="regular">
                {`Report - ${data?.first_name}`}
              </Text>
            </View>
            <View style={{ width: "100%", gap: 10 }}>
              <Input
                value={state.complaint}
                onChange={(e) => setState({ complaint: e })}
                size={20}
                headerFamily="bold"
                headerText="Complaint :"
                multiline
                numberOfLines={10}
                height={100}
                scrollEnabled
                textAlignVertical="top"
                paddingTop={10}
              />
              <Text size={18} color={Colors.Dark} family="bold">
                {`Report file :`}
              </Text>
              {state.pdf !== "" ? (
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0.5,
                    borderColor: Colors.borderColor,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      width: "90%",
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={Assets.sample_doc}
                      height={25}
                      width={25}
                      resize="cover"
                    />
                    <Text size={20} family={"regular"} color={Colors.black}>
                      {state.pdf?.name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setState({ pdf: "" })}
                    style={{
                      width: "10%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={Assets.close}
                      height={15}
                      width={15}
                      resize="cover"
                      onPress={() => setState({ pdf: "" })}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => uploadFiles()}
                  style={{
                    height: Height(6),
                    width: Width(50),
                    borderRadius: 10,
                    backgroundColor: Colors.grey,
                    alignItems: "center",
                    justifyContent: `center`,
                  }}
                >
                  <Text color={Colors.Dark} size={18}>
                    Choose file
                  </Text>
                </TouchableOpacity>
              )}
              <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
                <View style={{ width: "50%" }}>
                  <PrimaryButton
                    text={"Save"}
                    height={40}
                    width={"100%"}
                    borderRadius={12}
                    family="regular"
                    backgroundColor={["#a216cd", "#de0993"]}
                    size={18}
                    onPress={() => report()}
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <PrimaryButton
                    text={"Close"}
                    height={40}
                    width={"100%"}
                    borderRadius={12}
                    family="regular"
                    backgroundColor={["#ff2f63", "#ff2f63"]}
                    size={18}
                    onPress={() => filterRef.current.close()}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const css = StyleSheet.create({});
