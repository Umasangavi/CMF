import instance from "../utils/axios.utils";

const likes = {
  like: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `like_unlike/${id}/`;
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
};

export default likes;
