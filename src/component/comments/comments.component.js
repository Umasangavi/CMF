import {
  StyleSheet,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  Height,
  Width,
  getTimeDifference,
  useSetState,
} from "../../utils/function.utils";
import Assets from "../../imports/assets.import";
import {
  Colors,
  Image,
  Popup,
  Read_more,
  Star_rating,
  Text,
} from "../../utils/imports.utils";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Comments(props) {
  const { data, delete_comment } = props;
  const [state, setState] = useSetState({
    rating: 2,
    open: false,
  });
  return (
    <View
      style={{ height: "auto", width: "100%", borderRadius: 10, padding: 10 }}
    >
      <View style={{ padding: 5, flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: "20%",
            height: "100%",
          }}
        >
          <TouchableHighlight
            style={{
              height: 40,
              width: 40,
              borderRadius: 30,
              overflow: "hdden",
              backgroundColor: Colors.textGray,
            }}
          >
            <>
              <Image src={Assets.music} resize="cover" />
            </>
          </TouchableHighlight>
        </View>
        <View style={{ width: "70%", gap: 2 }}>
          <Text size={20} color={Colors.Dark} family={"bold"}>
            {data?.user}
          </Text>
          <Text size={16} color={Colors.Dark} family={"regular"}>
            {getTimeDifference(data?.commented_on)}
          </Text>
          {/* <Star_rating
            numberOfStart={5}
            size={18}
            value={state.rating}
            onChange={(val) => setState({ rating: val })}
          /> */}
        </View>
        <TouchableOpacity
          onPress={() => delete_comment()}
          style={{
            width: "10%",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Icon
            name={"trash"}
            size={20}
            color={Colors.darkPink}
            onPress={() => setState({ open: true })}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingLeft: 10, gap: 10 }}>
        <Read_more text={data?.comment} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image
              src={Assets.unlike}
              height={22}
              width={25}
              onPress={() => {}}
            />
            <Text color={Colors.Dark} family={"regular"} size={18}>
              {`${24} Like`}
            </Text>
          </View>
          {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image
              src={Assets.replay_active}
              height={22}
              width={30}
              onPress={() => {}}
            />
            <Text color={Colors.textColor} family={"regular"} size={18}>
              Replay
            </Text>
          </View> */}
        </View>
      </View>
      <Popup
        successOnPress={() => {
          delete_comment();
          setState({ open: false });
        }}
        close={() => setState({ open: false })}
        open={state.open}
        title={"Are you sure ?"}
        content={() => (
          <View style={{ paddingTop: 10 }}>
            <Text color={Colors.Dark} family="regular" size={20}>
              Are you sure to delete ?
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const css = StyleSheet.create({});
