import { useState } from "react";
import { login } from "../api/api";     
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();  

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await login(form);

            if (res.token) {
                console.log(res.token)           
                loginUser(res);          
                navigate("/appointments");
            } else {
                setError(res.message || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            console.error(err);
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: "380px" }}>
                <h2 className="text-center mb-4">Login</h2>

                {error && <p className="alert alert-danger py-2">{error}</p>}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input

                        className="form-control"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div><div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    /> </div>

                <button className="btn btn-primary w-100 mt-2" onClick={handleLogin}>Login</button>
            </div></div>
    );
}
