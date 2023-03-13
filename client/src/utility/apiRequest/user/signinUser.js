import apiCaller from "../apiCaller";

const signinUser = async (payload) => {
    try {
        const response = await apiCaller.post("/users/login", payload);
        return response.data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
};

export default signinUser;