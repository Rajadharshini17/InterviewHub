import { useState } from "react";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function AddExperience() {
 
 const user = JSON.parse(localStorage.getItem("user"));
 
 const [form, setForm] = useState({
  company: "",
  role: "",
  packageoffer: "",
  technologies: "",
  location: "",
  mode: "",
  experience: "",
  email: user?.email || ""
 });
 
 const [rounds, setRounds] = useState([{ text: "" }]);
 
 const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };
 
 const addRound = () => {
  setRounds([...rounds, { text: "" }]);
 };
 
 const updateRound = (index, value) => {
  const updated = [...rounds];
  updated[index].text = value;
  setRounds(updated);
 };
 
 const submitExperience = async () => {
 
  if (
   !form.company ||
   !form.role ||
   !form.packageoffer ||
   !form.technologies ||
   !form.location ||
   !form.mode ||
   !form.experience ||
   !form.email ||
   rounds.some(r => r.text.trim() === "")
  ) {
   alert("⚠️ Please fill all fields");
   return;
  }
 
  const questions = rounds
   .map((r, i) => `Round ${i + 1}: ${r.text}`)
   .join("\n");
 
  const payload = {
   ...form,
   rounds: rounds.length,
   questions
  };
 
  await api.post(`/experience/${user.userId}`, payload);
 
  alert("✅ Experience Submitted Successfully");
  window.location.href = "/dashboard";
 };
 
 return (
  <div
   className="min-vh-100 d-flex align-items-center justify-content-center"
   style={{
    background: "linear-gradient(135deg,#27235c,#97247e,#e01950)",
    padding: "20px"
   }}
  >
 
   {/* CARD */}
   <div
    className="shadow-lg w-100"
    style={{
     maxWidth: "760px",
     borderRadius: "20px",
     background: "rgba(255,255,255,0.95)",
     backdropFilter: "blur(10px)",
     padding: "25px"
    }}
   >
 
    {/* TITLE */}
    <h3 className="text-center fw-bold mb-4"
     style={{
      color: "#27235c"
     }}
    >
     ✨ Add Interview Experience
    </h3>
 
    {/* FORM */}
    <div className="row g-3">
 
     <div className="col-md-6">
      <input
       name="company"
       className="form-control"
       placeholder="🏢 Company"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="role"
       className="form-control"
       placeholder="💼 Role"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="packageoffer"
       className="form-control"
       placeholder="💰 Package (LPA)"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="technologies"
       className="form-control"
       placeholder="🛠 Technologies"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <input
       name="location"
       className="form-control"
       placeholder="📍 Location"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
     <div className="col-md-6">
      <select
       name="mode"
       className="form-select"
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      >
       <option value="">💻 Select Mode</option>
       <option value="Online">Online</option>
       <option value="Offline">Offline</option>
      </select>
     </div>
 
     <div className="col-md-12">
      <input
       name="email"
       className="form-control"
       value={form.email}
       onChange={handleChange}
       style={{ borderRadius: "12px" }}
      />
     </div>
 
    </div>
 
    {/* ROUNDS */}
    <div className="mt-4 p-3"
     style={{
      background: "#f8f9ff",
      borderRadius: "15px"
     }}
    >
     <h5 style={{ color: "#27235c" }} className="fw-bold">
      Interview Rounds
     </h5>
 
     {rounds.map((round, index) => (
      <div key={index} className="mb-3">
       <label className="fw-bold">
        Round {index + 1}
       </label>
 
       <textarea
        className="form-control"
        rows="2"
        placeholder="Questions asked..."
        onChange={e => updateRound(index, e.target.value)}
        style={{ borderRadius: "12px" }}
       />
      </div>
     ))}
 
     <button
      className="btn btn-sm text-white"
      style={{
       background: "#97247e",
       borderRadius: "10px"
      }}
      onClick={addRound}
     >
      + Add Round
     </button>
    </div>
 
    {/* EXPERIENCE */}
    <div className="mt-4">
     <textarea
      name="experience"
      className="form-control"
      rows="3"
      placeholder="📝 Overall Interview Experience"
      onChange={handleChange}
      style={{
       borderRadius: "12px"
      }}
     />
    </div>
 
    {/* SUBMIT */}
    <button
     className="btn w-100 mt-4 text-white fw-bold"
     style={{
      background: "linear-gradient(135deg,#27235c,#e01950)",
      borderRadius: "12px",
      padding: "10px"
     }}
     onClick={submitExperience}
    >
     Submit Experience
    </button>
 
   </div>
  </div>
 );
}
 