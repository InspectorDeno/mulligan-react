import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data }),
    getFriends: user =>
      axios.post("/api/friends", { user }).then(res => res.data.friends),
    //  axios.post("/api/findUser")
    getWeather: () =>
      axios.get("/api/weather/").then(res => res.data.weatherData) // For now or maybe done
  }
};
