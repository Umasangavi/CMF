import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import { Height, Width, useSetState } from "../../utils/function.utils";
import {
  Assets,
  BottomSheets,
  Colors,
  Dropdown,
  EventCard,
  Flatlist,
  FlatlistTwoRow,
  Image,
  Modal,
  Models,
  NavButton,
  SearchBar,
  Text,
  UserCard,
  WallCard,
} from "../../utils/imports.utils";
import Containers from "../../common_component/hoc/container.hoc";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {
  Days,
  categories,
  multiSelectCheckbox,
  search_type,
  tabs,
  type,
} from "../../utils/constant.utils";
import { user_details } from "../../utils/redux.utils";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const Home = () => {
  const userData = useSelector((state) => state?.user);

  const filterRef = useRef();


  const isFocused = useIsFocused();

  const [state, setState] = useSetState({
    location: [],
    city: "",
    open: false,
    tabActive: false,
    tabIndex: 0,
    eventData: [],
    wallData: [],
    loading: false,
    filterOpen: false,
    fromOpen: false,
    endOpen: false,
    fromDate: "",
    toDate: "",
    selectedLocation: "",
    name: "",
    selectedType: [],
    selectedCategories: [],
    search_index: 0,
    people_list: [],
  });

  useEffect(() => {
    if(isFocused){
    get_location();
    get_eventData();
  }
  }, [isFocused]);

  useEffect(() => {
    if (state.search?.length > 0) {
      search_data();
    } else {
      get_eventData();
      wallData();
    }
  }, [state.search]);

  useEffect(() => {
    if (state.tabIndex == 0) {
      get_eventData();
    }
    if (state.tabIndex == 1) {
      wallData(true);
    }
  }, [state.tabIndex]);

  useEffect(() => {
    get_eventData();
    wallData(true);
  }, []);

  useEffect(() => {
    filterData();
  }, [
    state.dayIndex,
    // state.tabIndex,
    state.selectedLocation,
    state.selectedType,
    state.selectedCategories,
    state.fromDate,
    state.toDate,
    state.name,
    state.search_index,
  ]);

  const search_data = async () => {
    try {
      const body = {
        name: state.search,
      };
      const result = await Models.search.people_search(body);
      console.log("search_data --->", result);

      setState({ people_list: result });
    } catch (e) {
      console.log(e);
    }
  };

  const get_location = async () => {
    try {
      const result = await Models.general.location();
      const data = result.locations?.map((item) => {
        return { label: item.name, value: item.id };
      });
      setState({ location: data });
    } catch (e) {
      console.log(e);
    }
  };

  const get_eventData = async () => {
    try {
      setState({ loading: true });
      const result = await Models.event.all_event();
      setState({ eventData: result.events });
      setState({ loading: false });
    } catch (e) {
      setState({ loading: false });

      console.log(e);
    }
  };

  const wallData = async (load = false) => {
    try {
      if (load) {
        setState({ loading: true });
      }
      const result = await Models.event.all_wall();
      console.log("wallData --->", result);
      setState({ wallData: result });
      setState({ loading: false });
    } catch (e) {
      setState({ loading: false });

      console.log(e);
    }
  };

  const filterData = async () => {
    try {
      const body = {};
      body.event_filter = search_type[state.search_index].value;

      if (state.name) {
        body.name = state.name;
      }
      if (state.selectedType?.length > 0) {
        body.event_type = state.selectedType;
      }
      if (state.selectedLocation) {
        body.location = state.selectedLocation;
      }
      if (state.selectedCategories?.length > 0) {
        body.event_category = state.selectedCategories;
      }
      if (state.fromDate) {
        body.after_date = moment(state.fromDate).format("YYYY-MM-DD");
      }
      if (state.toDate) {
        body.toDate = moment(state.toDate).format("YYYY-MM-DD");
      }
      console.log("✌️body --->", body);
      const result = await Models.event.search(body);
      console.log("filter --->", result);
      setState({
        eventData: result.events,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const selectedType = (item) => {
    const result = multiSelectCheckbox(state.selectedType, item);
    setState({ selectedType: [...result] });
  };

  const selectedCategory = (item) => {
    const result = multiSelectCheckbox(state.selectedCategories, item);
    setState({ selectedCategories: [...result] });
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0.1 }}
      // end={{ x: 1, y: 0.2}}
      colors={[
        "rgba(0, 210, 225, 0.1)", // #00D2E1 with 50% opacity
        "rgba(108, 77, 218, 0.2)", // #6C4DDA with 50% opacity
        "rgba(134, 104, 254, 0.2)", // #8668FE with 50% opacity
        "rgba(255, 78, 152, 0.2)", // #FF4E98 with 50% opacity
        "rgba(255, 191, 53, 0.1)", // #FFBF35 with 50% opacity
        "rgba(255, 195, 203, 0.2)", // #FFC3CB with 50% opacity
        "rgba(255, 195, 221, 0.2)", // #FFC3DD with 50% opacity
        "rgba(255, 226, 133, 0.4)", // #FFE285 with 50% opacity
        "rgba(255, 228, 244, 0.2)", // #FFE4F4 with 50% opacity
        "rgba(0, 210, 225, 0.1)",
      ]}
      // locations={[0.2, 1, 0.2, 1, 1, 1, 1, 1, 1]}
      style={{ width: "100%" }}
      angle={300}
    >
      <Containers
        screen
        style={styles.container}
        backgroundColor={Colors.textPrimary}
      >
        <View style={styles.wrapper}>
          <View style={styles.buttonContainer}>
            <KeyboardAvoidingView behavior="position">
              <View style={styles.locationContainer}>
                <View style={styles.toggleButton}>
                  {/* <Image src={Assets.toggle_btn} width={30} height={30} /> */}
                </View>
                <View style={styles.location}>
                  <TouchableOpacity onPress={() => setState({ open: true })}>
                    <Text color={Colors.light} size={18}>
                      Current Location ▼
                    </Text>
                  </TouchableOpacity>
                  <Text color={Colors.light} size={18}>
                    {state.city}
                  </Text>
                </View>
                <View style={styles.notification}>
                  {/* <Image src={Assets.notification} width={30} height={30} /> */}
                </View>
              </View>
              <View style={styles.searchContainer}>
                <View
                  style={[
                    styles.search,
                    { width: state.tabIndex == 0 ? "80%" : "100%" },
                  ]}
                >
                  <SearchBar
                    value={state.search}
                    placeholder="Search by name"
                    onChange={(e) => setState({ search: e })}
                  />
                </View>
                {state.tabIndex == 0 && (
                  <View
                    style={styles.filterIconContainer}
                  >
                    <NavButton
                      height={50}
                      width={50}
                      background={Colors.color}
                      radius={100}
                      icon={Assets.filter}
                      iconWidth={30}
                      iconHeight={30}
                      onPress={() => filterRef.current.open()}
                    />
                  </View>
                )}
              </View>
              <View style={[styles.tabContainer,{paddingTop: state.tabIndex == 0 ? 30 : 55,}]}>
                {tabs?.map((label, index) => (
                  <TouchableHighlight
                    underlayColor={Colors.light}
                    onPress={() => setState({ tabIndex: index })}
                    style={[styles.tabBar,{backgroundColor:state.tabIndex == index ? Colors.blue : Colors.light,}]}>             
                    <Text
                      color={
                        state.tabIndex == index ? Colors.light : Colors.Dark
                      }
                      size={18}
                      family={"bold"}
                      onPress={() => setState({ tabIndex: index })}
                    >
                      {label}
                    </Text>
                  </TouchableHighlight>
                ))}
              </View>
            </KeyboardAvoidingView>
          </View>

          <View style={styles.cardContainer}>
            {state.search?.length > 0 ? (
              state.people_list?.length > 0 ? (
                <View  style={styles.userCard}>
                  <Flatlist
                    gap={5}
                    loading={state.loading}
                    data={state.people_list}
                    renderComponent={(item) => (
                      <View style={{ gap: 5 }}>
                        <UserCard data={item} />
                      </View>
                    )}
                  />
                </View>
              ) : (
                <View style={styles.text}>
                  <Text color={Colors.textGray} size={20}>
                    No Data found
                  </Text>
                </View>
              )
            ) : state.tabIndex == 0 ? (
              <View style={styles.alleventsCard}>
                <FlatlistTwoRow
                  loading={state.loading}
                  data={state.eventData}
                  renderComponent={(item, index) => (
                    <EventCard data={item} index={index} />
                  )}
                />
              </View>
            ) : (
              <View style={styles.wallCard}>
                <Flatlist
                  loading={state.loading}
                  data={state.wallData}
                  renderComponent={(item) => (
                    <WallCard data={item} updateList={() => wallData(false)} />
                  )}
                />
              </View>
            )}
          </View>

          <Modal
            open={state.open}
            close={() => setState({ open: false })}
            renderComponent={() => (
              <View style={styles.modalLocation}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.modalContainer}>
                    <TouchableHighlight
                      underlayColor={Colors.textGray}
                      onPress={() => setState({ open: false })}
                      style={styles.closeContainer}                   
                    >
                      <TouchableHighlight
                        underlayColor={Colors.textGray}
                        onPress={() => setState({ open: false })}
                        style={styles.closeBackground}                       
                      >
                        <Image src={Assets.close} height={15} width={15} />
                      </TouchableHighlight>
                    </TouchableHighlight>
                    {state.location?.map((locationItem) => (
                      <TouchableHighlight
                        underlayColor={Colors.inputBg}
                        key={locationItem.value}
                        style={styles.locationTextContainer}
                        
                        onPress={() => {
                          setState({ city: locationItem?.label, open: false });
                        }}
                      >
                        <Text size={18} color={Colors.textColor} family="regular">
                          {locationItem?.label}
                        </Text>
                      </TouchableHighlight>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}/>
        </View>
      </Containers>

      <BottomSheets
        height={"auto"}
        ref={filterRef}
        renderComponent={() => (
          <ScrollView>
            <View style={styles.filterCardContainer}>
              <View style={styles.filterTextContainer}>
                <TouchableOpacity style={styles.filterTextAlign}>            
                  <Text size={20} family="bold">
                    Filter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterClose} onPress={() => filterRef.current.close()}>
                  <Image
                    src={Assets.close}
                    height={15}
                    width={15}
                    onPress={() => filterRef.current.close()}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.weekmonthContainer}>               
                {Days?.map((item, index) => (
                  <TouchableHighlight
                    underlayColor={Colors.light}
                    onPress={() => setState({ dayIndex: index })}
                    style={[styles.weekmonthTab, {backgroundColor:
                      state.dayIndex == index
                        ? Colors.blue
                        : Colors.lightGrey,}]}>                
                    <Text
                      color={
                        state.dayIndex == index ? Colors.light : Colors.Dark
                      }
                      size={18}
                      family={"regular"}
                      onPress={() => setState({ dayIndex: index })}
                    >
                      {item}
                    </Text>
                  </TouchableHighlight>
                ))}
              </View>
              <View style={styles.searchtypeHeadingContainer}>
                <Text size={20} family="bold" bottom={3}>
                  Search type
                </Text>
                {search_type.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setState({ search_index: index })}
                    style={styles.searchtypeContainer}
                    
                  >
                    <View style={styles.searchRadioContainer}>
                      <Image
                        src={
                          state.search_index == index
                            ? Assets.radio_checked
                            : Assets.radio_unchecked
                        }
                        height={40}
                        width={40}
                        onPress={() => setState({ search_index: index })}
                      />
                    </View>
                    <Text size={20}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.filterSearch}>
                <SearchBar
                  backgroundColor={Colors.lightGrey}
                  value={state.name}
                  placeholder="search by name"
                  onChange={(e) => setState({ name: e })}
                />
              </View>
              <View style={styles.filterLocation}>
                <Text size={20} family="bold">
                  Location
                </Text>
                <Dropdown
                  height={50}
                  value={state.selectedLocation}
                  onchange={(value) => setState({ selectedLocation: value })}
                  option={state.location}
                  placeholder="Choose location"
                  size={18}
                />
              </View>
              <View style={styles.eventmodeHeadingContainer}>
                <Text size={20} family="bold" bottom={3}>
                  Event Mode
                </Text>
                {type.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => selectedType(item)}
                    style={styles.eventmodeContainer}>
                    <View style={styles.eventRadioContainer}>
                      <Image
                        src={
                          state.selectedType?.indexOf(item.value) !== -1
                            ? Assets.checked_blue
                            : Assets.unchecked
                        }
                        height={35}
                        width={35}
                        onPress={() => selectedType(item)}
                      />
                    </View>
                    <Text size={20}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.categoriesHeadingContainer}>
                <Text size={20} family="bold" bottom={3}>
                  Categories
                </Text>
                {categories.map((item, index) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => selectedCategory(item)}
                    style={styles.categoriesContainer}
                    >
                    <View style={styles.categoriesRadioContainer}>
                      <Image
                        src={
                          state.selectedCategories?.indexOf(item.value) !== -1
                            ? Assets.checked_blue
                            : Assets.unchecked
                        }
                        height={35}
                        width={35}
                        onPress={() => selectedCategory(item)}
                      />
                    </View>
                    <Text size={20}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.fromHeadingContainer}>
                <Text size={20} family="bold" bottom={3}>
                  From
                </Text>

                <TouchableOpacity
                  onPress={() => setState({ startOpen: true })}
                  style={styles.fromdateContainer}
                  
                >
                  <Text size={16} color={Colors.textColor}>
                    {state.fromDate
                      ? moment(state.fromDate).format("YYYY-MM-DD")
                      : "Start date"}
                  </Text>
                </TouchableOpacity>
                {state.startOpen && (
                  <DateTimePicker
                    display={state.startOpen}
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    onChange={(val) => {
                      const momentDate = moment(val.nativeEvent.timestamp);
                      setState({
                        fromDate: momentDate.format(),
                        startOpen: false,
                        toDate: "",
                      });
                    }}
                  />
                )}
              </View>

              <View style={styles.todateHeadingContainer}>
                <Text size={20} family="bold" bottom={3}>
                  To
                </Text>

                <TouchableOpacity
                  onPress={() => setState({ endOpen: true })}
                  style={styles.todateContainer}>
                  <Text size={16} color={Colors.textColor}>
                    {state.toDate
                      ? moment(state.toDate).format("YYYY/MM/DD")
                      : "To date"}
                  </Text>
                </TouchableOpacity>
                {state.endOpen && (
                  <DateTimePicker
                    display={state.endOpen}
                    minimumDate={
                      state.fromDate ? new Date(state.fromDate) : new Date()
                    }
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={"date"}
                    is24Hour={true}
                    onChange={(val) => {
                      const momentDate = moment(val.nativeEvent.timestamp);
                      setState({ toDate: momentDate.format(), endOpen: false });
                    }}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    height: "25%",
    backgroundColor: Colors.textPrimary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  search: {
    justifyContent: "center",
  },
locationContainer:{
  flexDirection: "row",
  width: "100%",
  paddingTop: 10,
  alignItems: "center",
},
toggleButton:{
  width: "20%",
  alignItems: "center",
},
location:{
  width: "60%",
  alignItems: "center",
},
notification:{
  width: "20%",
  alignItems: "center",
  paddingLeft: 10,
},
searchContainer:{
  flexDirection: "row",
  width: "100%",
  paddingTop: 20,
  alignItems: "center ",
  padding: 5,
},
filterIconContainer:{
  width: "20%",
  alignItems: "center",
},
tabContainer:{
  flexDirection: "row",
  gap: 20,
  height: 30,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
},

tabBar:{
  height: Height(5),
  width: Width(30),
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",

},
cardContainer:{
  width: "100%",
  alignItems: "center",
  paddingTop: 30,
  height: "75%",
},
userCard:{
  width: "96%"
},
text:{
  alignItems: "center", 
  paddingTop: 200 
},
alleventsCard:{
  width: "98%", 
  padding: 5
},
wallCard:{
  width: "98%"
},
modalLocation:{
    height: "100%",
    width: "100%",
    padding: 10,
    justifyContent: "center",
},
modalContainer: {
  backgroundColor: Colors.light,
  borderRadius: 10,
  padding: 10,
  gap: 20,
  width: "100%", 
},
closeContainer:{
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
},
closeBackground:{
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.inputBg,
  borderRadius: 20,
  padding: 10,
  height: 40,
  width: 40,
},
locationTextContainer:{
    height: 30,
    paddingLeft: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.textGray,
    gap: 5,
},
locationItem: {
  paddingLeft: 20,
  borderBottomWidth: 0.2,
  borderBottomColor: Colors.textGray,
  gap: 5,
},
filterCardContainer:{
  padding: 20,
  width: "100%"
},
filterTextContainer:{
  flexDirection: "row",
  alignItems: "center" ,
},
filterTextAlign:{
    width: "85%",
    alignItems: "center",
    paddingLeft: 30,
},
filterClose:{
  width: "15%", 
  alignItems: "flex-end",
},
weekmonthContainer:{
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: Height(5),
},
weekmonthTab:{
    height: Height(5),
    width: Width(32),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
},
searchtypeHeadingContainer:{
  paddingTop: 15, 
  gap: 5
},
searchtypeContainer:{
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
},
searchRadioContainer:{
  paddingTop: 1 
},
filterSearch:{
  paddingTop: 30
},
filterLocation:{
  paddingTop: 30, 
  gap: 5 
},
eventmodeHeadingContainer:{
  paddingTop: 15, 
  gap: 5
},
eventmodeContainer:{
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
},
eventRadioContainer:{
  paddingTop: 5 
},
categoriesHeadingContainer:{
  paddingTop: 15, 
  gap: 5,
},
categoriesContainer:{
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
},
categoriesRadioContainer:{
   paddingTop: 5
},
fromHeadingContainer:{
  paddingTop: 15, 
  gap: 5 
},
fromdateContainer:{
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.light,
    justifyContent: "center",
    paddingLeft: 20,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
},
todateHeadingContainer:{
  paddingTop: 15,
   gap: 5 
},
todateContainer:{
  width: "100%",
  height: 50,
  borderRadius: 10,
  backgroundColor: Colors.light,
  justifyContent: "center",
  paddingLeft: 20,
  borderWidth: 0.5,
  borderColor: Colors.borderColor,
},
});

export default Home;
