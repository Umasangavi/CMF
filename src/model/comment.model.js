import instance from "../utils/axios.utils";

const comment = {
  add_comment: (id,data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `post_comment/${id}/`;
      instance()
        .post(url,data)
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

  delete_comment: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `post_comment_delete/${id}/`;
      instance()
        .delete(url)
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

export default comment;
