import { useState } from "react";
import api from "../api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", address: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input name="name" placeholder="Name" required onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
      <input name="address" placeholder="Address" required onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}
