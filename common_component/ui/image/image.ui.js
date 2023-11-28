import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";

const ImageComponent = (props) => {
  const { src, width, height, resize, borderRadius } = props;

  const getType = (src) => {
    // console.log(typeof(src))
    if (typeof src === "string") {
      return "url";
    } else if (typeof src === "function") {
      return "svg";
    } else {
      return "png";
    }
  };
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <>
      <Image
        style={[
          props.style,
          css.image,
          height && { height },
          width && { width },
          { borderRadius: borderRadius ? borderRadius : 0 },
        ]}
        placeholder={blurhash}
        source={src}
        contentFit={resize ? resize : "cover"}
      />
    </>
  );
};

const css = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageComponent;
