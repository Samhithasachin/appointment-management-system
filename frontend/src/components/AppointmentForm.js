import { useState, useEffect } from "react";

export default function AppointmentForm({ initial, onSubmit }) {
    const [form, setForm] = useState({
        patientName: "",
        doctor: "",
        date: "",
        time: "",
        status: "scheduled",
        ...initial
    });
    
    useEffect(() => {
        if (initial) {
            setForm({
                patientName: initial.patientName || "",
                doctor: initial.doctor || "",
                date: initial.date || "",
                time: initial.time || "",
                status: initial.status || "scheduled"
            });
        }
    }, [initial]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="card shadow p-4" style={{ width: "580px" }}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(form);
                    }}
                    className="appointment-form"
                >
                    <div className="mb-3">
                        <label className="form-label">Patient Name</label>
                        <input className="form-control"
                            name="patientName"
                            placeholder="Patient Name"
                            value={form.patientName}
                            onChange={handleChange}
                            required
                        /></div>
                    <div className="mb-3">
                        <label className="form-label">Doctor Name</label>
                        <input
                            className="form-control"
                            name="doctor"
                            placeholder="Doctor"
                            value={form.doctor}
                            onChange={handleChange}
                            required
                        /></div>
                    <label className="form-label">Appointment Date & Time</label><br />
                    <div className="mb-3 d-flex">

                        <input
                            className="form-control d-inline-block w-50 me-2"
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className="form-control d-inline-block w-50 me-2"
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            required
                        /></div>
                        <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                        <option value="scheduled">Scheduled</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                    </select></div>
                    <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-md btn-primary " style={{ width: "100%" }} type="submit">Save</button></div>
                </form></div></div>
    );
}
