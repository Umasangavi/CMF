import instance from "../utils/axios.utils";

const event = {
  all_event: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "all_events/";
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

  create_event: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "create_event/";
      instance()
        .post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data", // Add the Content-Type header
          },
        })
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

  event_details: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `event_details/${id}/`;

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
  },

  get_event_by_id: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `edit_event/${id}/`;
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
  },

  all_wall: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "posts/";
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

  search: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "event_search/";
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
  recent_event: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "recent_events/";
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

  event_performer_add: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "event_performer_add/";
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
  musician: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `musician_search/${id}`;
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

  band: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `troupe_search/${id}`;
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
  musicschool: (id) => {
    let promise = new Promise((resolve, reject) => {
      let url = `gurukulam_search/${id}`;
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

export default event;
