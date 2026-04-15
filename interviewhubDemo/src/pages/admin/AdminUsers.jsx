import "./admin.css";
import api from "../../api/axios";
 
export default function AdminUsers({ users = [], refresh }) {
 
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
 
    try {
      await api.delete(`/user/${id}`); // ✅ CORRECT URL
      alert("User deleted successfully ✅");
 
      if (refresh) refresh(); // safer call
 
    } catch (err) {
  alert(err.response?.data || "Delete failed");
}
  };
 
  return (
    <div className="section">
 
      <h3>User Profile Management</h3>
 
      <table className="user-table">
 
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Qualification</th>
            <th>Experience Level</th>
            <th>Hobby</th>
            <th>Action</th>
          </tr>
        </thead>
 
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.userId}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.qualification}</td>
                <td>{u.experienceLevel}</td>
                <td>{u.hobby}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(u.userId)}
                  >
                    Block
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
 
      </table>
 
    </div>
  );
}

 