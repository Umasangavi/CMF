import { Models } from "./imports.utils";
import { user_details } from "./redux.utils";

export const user_data = async () => {
  try {
    const result = await Models.auth.my_profile();
    console.log("✌️result --->", result);
    user_details(result);
  } catch (e) {
    console.log(e);
  }
};
