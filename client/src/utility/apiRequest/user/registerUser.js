import apiCaller from "../apiCaller";
import signupUser from "../../../firebase/user/signupUser";

const registerUser = async (payload) => {
  const { name, email, password } = payload;

  // Create user with Firebase authentication
  await signupUser({ name, email, password });

  // Register user in your own API
  const response = await apiCaller.post("users/register", payload);

  return response.data;
};

export default registerUser;