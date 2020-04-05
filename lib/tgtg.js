const axios = require("axios");

const DEFAULT_TAGS = [
  "Favorites",
  "LastToday",
  "Tomorrow",
  "NearBy",
  "CollectNow",
  "Meals",
  "BakedGoods",
  "Groceries",
  "Recommended",
  "Breakfast",
  "Lunch",
  "Dinner",
  "TooGoodToGoStore",
  "EverythingElse",
  "SoldOut",
  "NothingToSave",
  "Vegetarian",
  "Unlocked",
  "EssentialBags",
];

class Tgtg {
  constructor({ email, password }) {
    this.request = axios.create({
      baseURL: "https://apptoogoodtogo.com/api",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "fr-FR",
      },
    });
    this.email = email;
    this.password = password;
    this.userId = null;
    this.accessToken = null;

    this.request.interceptors.request.use(
      (axiosConfig) => {
        if (axiosConfig.url !== "/auth/v1/loginByEmail") {
          Object.assign(axiosConfig.headers, {
            Authorization: `Bearer ${this.accessToken}`,
          });
        }
        return axiosConfig;
      },
      (error) => Promise.reject(error)
    );
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  async login() {
    try {
      const response = await this.request({
        url: "/auth/v1/loginByEmail",
        method: "POST",
        data: {
          email: this.email,
          device_type: "IOS",
          password: this.password,
        },
      });
      const {
        access_token,
        startup_data: { user },
      } = response.data;
      this.setAccessToken(access_token);
      this.setUserId(user.user_id);
      return response.data;
    } catch (err) {
      console.log("error with login", err);
    }
  }

  async getProfile() {
    try {
      const response = await this.request({
        url: "/user/v1/",
        method: "POST",
        params: {
          user_id: this.userId,
        },
      });
      return response.data;
    } catch (err) {
      console.log("error with getProfile", err);
    }
  }

  async discoverNearby({ latitude, longitude }, tags = DEFAULT_TAGS) {
    try {
      const response = await this.request({
        url: "/item/v5/discover",
        method: "POST",
        data: {
          user_id: this.userId,
          origin: {
            latitude,
            longitude,
          },
          bucket_identifiers: tags,
        },
      });
      return response.data;
    } catch (err) {
      console.log("error with discoverNearby", err);
    }
  }

  async getStore(storeId, { latitude, longitude }) {
    try {
      const response = await this.request({
        url: `/item/v5/${storeId}`,
        method: "POST",
        data: {
          user_id: this.userId,
          origin: {
            latitude,
            longitude,
          },
        },
      });
      return response.data;
    } catch (err) {
      console.log("error with getStore", err);
    }
  }
}

module.exports = Tgtg;
