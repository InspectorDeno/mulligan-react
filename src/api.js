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
    setHcp: (user, hcp) =>
      axios.post("/api/users/sethcp", { user, hcp }).then(res => res.data.user),
    getFriends: user =>
      axios
        .post("/api/users/get_friends", { user })
        .then(res => res.data.friendData),
    getPending: user =>
      axios
        .post("(api/users/get_pending", { user })
        .then(res => res.data.pendingData),
    addFriend: (user, friend) =>
      axios
        .post("/api/friends/add", { user, friend })
        .then(res => res.data.add_friend),
    acceptFriend: (user, friend, response) =>
      axios
        .post("/api/friends/respond", { user, friend, response })
        .then(res => res.data.friends), // ändra denna THEN
    // TODO Kanske egen reducer för friend
    findUser: user =>
      axios.post("/api/users/find", { user }).then(res => res.data.userData),
    getWeather: () =>
      axios.get("/api/weather").then(res => res.data.weatherData) // For now or maybe done
  },
  golfclub: {
    findClub: clubName =>
      axios
        .post("/api/golfclub", { clubName })
        .then(res => res.data.golfClubData)
  }
};
