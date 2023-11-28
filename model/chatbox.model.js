import instance from "../utils/axios.utils";

const chatBox = {
  chat_user_list: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "chat_box/";
      instance()
        .get(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("✌️error --->", error);
          reject(error);
        });
    });
    return promise;
  },

  get_message: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `get_message/${id}`;
      instance()
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log("✌️error --->", error);
          reject(error);
        });
    });
    return promise;
  }
}
 
 

export default chatBox;
