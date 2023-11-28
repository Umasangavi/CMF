import instance from "../utils/axios.utils";

const search = {
  people_search: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "all_people/";
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
 
 

export default search;
