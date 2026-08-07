import axios from "axios";

const API = "http://localhost:5000/api/certificates";

export const verifyCertificate = async (certificateId) => {
  const res = await axios.get(`${API}/verify/${certificateId}`);
  return res.data;
};