import instance from "../utils/axios.utils";

const people = {
  all_people: (data) => {
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
  },

  follower: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "followers/";
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

  following: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "following/";
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

  report: (id,data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `report_people/${id}/`;
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

  add_performer: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "event_performer_add/";
      instance()
        .post(url, data)
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

  add_highlight: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "myhighlight_add/";
      instance()
        .post(url, data)
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

  update_highlight: (id, data) => {
    let promise = new Promise((resolve, reject) => {
      let url = `highlight_edit/${id}/`;
      instance()
        .put(url, data)
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

  delete_performer: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `delete/event_performer/${id}/`;
      instance()
        .post(url, id)
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

  delete_highlight: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `delete/highlight/${id}/`;
      instance()
        .post(url, id)
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

export default people;
