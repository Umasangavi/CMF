import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { Assets, Text, Colors, Image, Models } from "../../utils/imports.utils";
import { useSetState } from "../../utils/function.utils";

export default function BottomLayer(props) {
  const { data, updateList } = props;

  const [state, setState] = useSetState({
    liked: false,
  });

  const handle_like = async () => {
    try {
      await Models.likes.like(data.id);
      updateList();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TouchableOpacity
          onPress={() => handle_like()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image
            src={data?.liked_by_user ? Assets.liked : Assets.unlike}
            height={18}
            width={20}
            onPress={() => handle_like()}
          />
          {data?.like_count > 0 && (
            <Text color={Colors.Dark} family={"bold"} size={18}>
              {data?.like_count}
            </Text>
          )}
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5,padding:5 }}>
          <Image src={Assets.comment} height={25} width={25} />
          {data?.comment_count > 0 && (
            <Text color={Colors.Dark} family={"bold"} size={18}>
              {data?.comment_count}
            </Text>
          )}
        </View>

        {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image src={Assets.share} height={18} width={15} />
          <Text color={Colors.Dark} family={"bold"} size={18}>
            2
          </Text>
        </View> */}
      </View>
      {/* <View style={{}}>
        <Image src={Assets.bookmark} height={18} width={18} />
      </View> */}
    </View>
  );
}

const css = StyleSheet.create({});
