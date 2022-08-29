import api from "../../configApi";

export const callApi = (email, password) =>
  api
    .post("/users/login", {
      user: {
        email,
        password,
      },
    })
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        //   alert("success");
        console.log("res", res.data);
        const {
          user: { token },
        } = res.data;
        //ghi gia tri token vao localstorage
        console.log("token", token);
        localStorage.setItem("token", `${token}`);
      }
    });
