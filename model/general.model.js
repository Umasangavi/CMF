import instance from "../utils/axios.utils";

const general = {
  location: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "location/";
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
  }
}
 
 

export default general;
