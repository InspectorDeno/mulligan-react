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
    setHcp: (hcp) =>
      axios.post("/api/users/sethcp", { hcp }).then(res => res.data.user),
    getFriends: () =>
      axios
        .post("/api/users/get_friends")
        .then(res => res.data.friendData),
    getPending: () =>
      axios
        .post("/api/users/get_pending")
        .then(res => res.data.pendingData),
    addFriend: (friend) =>
      axios
        .post("/api/friends/add", { friend })
        .then(res => res.data.add_friend),
    respondFriendship: (friend, response) =>
      axios
        .post("/api/friends/respond", { friend, response })
        .then(res => res.data.respondData),
    findUser: (user) =>
      axios.post("/api/users/find", { user }).then(res => res.data.userData),
    getWeather: () =>
      axios.get("/api/weather").then(res => res.data.weatherData),
    addScorecard: (data) => axios.post("/api/golfrounds/add", { data }).then(res => res.data.scorecardData),
    getScorecards: () => axios.post("/api/golfrounds").then(res => res.data.scorecardData)
  },
  golfclub: {
    findClub: clubName =>
      axios
        .post("/api/golfclub", { clubName })
        .then(res => res.data.golfClubData)
  }
};
