import {
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from "react-native";
import React from "react";
import {
  Assets,
  BottomLayer,
  Colors,
  Comments,
  Flatlist,
  Image,
  Models,
  Read_more,
  Text,
  TextInput,
} from "../../utils/imports.utils";
import { Height, useSetState } from "../../utils/function.utils";

export default function Wall(props) {
  const { data, updateList } = props;

  const [state, setState] = useSetState({
    showComment: false,
    comment: "",
  });

  const addComment = async (item) => {
    try {
      const body = {
        comment: state.comment,
      };
      await Models.comment.add_comment(data.id, body);
      setState({ comment: "" });
      updateList();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async (item) => {
    try {
      const re = await Models.comment.delete_comment(item.id);
      updateList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={css.container} activeOpacity={0.9}>
      <View style={css.wrapper}>
        <View style={css.profileRowContainer}>
          <View style={css.profileWidth}>
            <View style={css.profileImage}>
              <Image
                src={data?.user_profile_picture}
                height={"100%"}
                width={"100%"}
                resize="cover"
              />
            </View>
          </View>
          <View style={css.profileRow}>
            <Text color={Colors.Dark} family={"bold"} size={18}>
              {data?.user}
            </Text>
          </View>
          <View style={css.menu}>
            <Image src={Assets.menu} height={40} width={40} />
          </View>
        </View>
        <View style={css.posterImage}></View>

        <BottomLayer data={data} updateList={() => updateList()} />

        <Read_more text={data?.content} />
        {data?.comments?.length > 0 && (
          <TouchableHighlight
            underlayColor={Colors.inputBg}
            style={css.showComment}
            onPress={() => setState({ showComment: !state.showComment })}
          >
            <Text
              color={Colors.textGray}
              size={16}
              onPress={() => setState({ showComment: !state.showComment })}
            >
              {`View all ${data?.comments?.length} comments `}
            </Text>
          </TouchableHighlight>
        )}
        {state.showComment && (
          <View>
            <Flatlist
              data={data?.comments}
              renderComponent={(item) => (
                <Comments
                  data={item}
                  delete_comment={() => deleteComment(item)}
                />
              )}
            />
          </View>
        )}
        <View style={css.commentRowContainer}>
          <View style={css.commentWidth}>
            <TextInput
              placeholder="Add a comment ..."
              backgroundColor={Colors.light}
              leftIconPosition
              rightIconPosition
              rightIcon={Assets.tick_grey}
              height={40}
              size={20}
              leftIcon={data?.current_user_profile_picture}
              value={state.comment}
              onChange={(e) => setState({ comment: e })}
              imageHeight={"100%"}
              imageWidth={"100%"}
              iconStyle={{ height: 40, width: 40, borderRadius: 30 }}
            />
          </View>
          <TouchableHighlight
            underlayColor={Colors.light}
            onPress={() => addComment()}
            style={css.arrow}
          >
            <Image
              src={Assets.forward}
              height={30}
              width={30}
              onPress={() => addComment()}
            />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  container:{
    width: "100%", 
    padding: 5 
  },
  wrapper:{
    backgroundColor: Colors.light, 
    padding: 5, 
    borderRadius: 10
  },
  profileRowContainer:{
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  profileWidth:{
    width: "15%"
  },
  profileImage:{
    width: 40,
    height: 40,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: Colors.textPrimary,
  },
  profileRow:{
    width: "70%", 
    paddingLeft: 20, 
    paddingRight: 1 
  },
  menu:{
    width: "15%", 
    alignItems: "flex-end",
  },
  posterImage:{
    height: Height(30),
    width: "100%",
    backgroundColor: "green",
    borderRadius: 20,
  },
  showComment:{
    paddingTop: 5,
  },
  commentRowContainer:{
    flexDirection: "row", 
    alignItems: "center",
  },
  commentWidth:{
    width: "85%",
  },
  arrow:{
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  }
});
