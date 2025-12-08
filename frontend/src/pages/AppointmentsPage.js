import { useState, useEffect, useCallback } from "react";
import { getAppointments, deleteAppointment } from "../api/api";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import debounce from "lodash.debounce";

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState([]);
    const [filters, setFilters] = useState({
        search: "",
        doctor: "",
        status: "",
    });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [doctorOptions, setDoctorOptions] = useState([]);


  

    const fetchData = async (reset = false) => {
        setLoading(true);
        try {
            // Simulating delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            const res = await getAppointments({ ...filters, page });
            const data = Array.isArray(res) ? res : res.data;

            if (data.length === 0) setHasMore(false);

            setAppointments((prev) => (reset ? data : [...prev, ...data]));
        } catch (err) {
            console.error("Failed to fetch appointments:", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        setAppointments([]);
        setPage(1);
        setHasMore(true);
    }, [filters]);

  



    const debouncedFetch = useCallback(
        debounce(() => {
            setAppointments([]);
            setPage(1);
            setHasMore(true);
            fetchData(true); 
        }, 300),
        [filters]
    );

    useEffect(() => {
        debouncedFetch();
        return debouncedFetch.cancel; 
    }, [filters, debouncedFetch]);

    useEffect(() => {
        if (page > 1) fetchData();
    }, [page]);

    useEffect(() => {
        const uniqueDoctors = Array.from(new Set(appointments.map(a => a.doctor)));
        setDoctorOptions(uniqueDoctors);
    }, [appointments]);

    const handleDelete = async (id) => {
        const ok = window.confirm("Cancel this appointment?");
        if (!ok) return;

        await deleteAppointment(id);

       
        setAppointments((prev) => prev.filter((app) => app.id !== id));
    };

    return (
        <div className="container py-4">
            <h2 className="text-center my-4">Appointments</h2>

            
            <div className="row g-3 mb-4">
                <div className="col-md-4 filters">
                    <input
                        className="form-control"
                        placeholder="Search patient"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                        }
                    /></div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={filters.doctor}
                        onChange={(e) => setFilters({ ...filters, doctor: e.target.value })}
                    >
                        <option value="">All Doctors</option>
                        {doctorOptions.map((doc) => (
                            <option key={doc} value={doc}>
                                {doc}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({ ...filters, status: e.target.value })
                        }
                    >
                        <option value="">All</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div></div>

           

          
            <div className="row">
                {appointments.map((app) => (
                    <div key={app.id} className="col-md-4 mb-3">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{app.patientName}</h5>
                                <div className="card-text">
                                    <p><strong>Doctor:</strong> {app.doctor}</p>
                                    <p><strong>Date:</strong> {app.date}</p>
                                    <p><strong>Time:</strong> {app.time}</p>
                                    <p style={{textTransform:"capitalize"}}><strong>Status:</strong> {app.status}</p></div>
                                <div className="d-flex justify-content-between mt-3">
                                    <Link to={`/appointments/${app.id}`} className="btn btn-sm btn-outline-primary">Edit</Link>

                                    <button onClick={() => handleDelete(app.id)} className="btn btn-sm btn-outline-danger">
                                        Cancel
                                    </button></div>
                            </div></div></div>
                ))}</div>

            {loading && <Loader />}

            
            {!loading && hasMore && (
                <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-sm btn-outline-primary" onClick={() => setPage((prev) => prev + 1)}>
                    Load More
                </button></div>
            )}

            {!hasMore && <p>No more appointments.</p>}
        </div>
    );
}
