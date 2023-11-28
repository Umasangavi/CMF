import instance from "../utils/axios.utils";

const auth = {
  login: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "login/";
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
  signup: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "signup/";
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
  forget_password: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "password_reset/";
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

  my_profile: () => {
    let promise = new Promise((resolve, reject) => {
      let url = "my_profile/";
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

  getProfile: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "event_organizer_edit/";
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

  updateProfiles: (data) => {
    let promise = new Promise((resolve, reject) => {
      let url = "event_organizer_edit/";
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      instance()
        .put(url, formData, {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          console.log("✌️url --->", url);
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

export default auth;
