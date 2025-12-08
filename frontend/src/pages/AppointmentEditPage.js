import { useEffect, useState } from "react";
import {
    getAppointments,
    createAppointment,
    updateAppointment,
} from "../api/api";
import AppointmentForm from "../components/AppointmentForm";
import { useParams, useNavigate } from "react-router-dom";

export default function AppointmentEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);

   
    const loadData = async () => {
        if (id === "new") return;

        try {
            const res = await getAppointments({});
            const appointmentsArray = res.data; 
            const found = appointmentsArray.find((a) => a.id === id);
            setAppointment(found);
        } catch (err) {
            console.error("Failed to load appointment:", err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const save = async (data) => {
        if (id === "new") await createAppointment(data);
        else await updateAppointment(id, data);
        navigate("/appointments");
    };

    return (

        <div className="container py-4">
            <h2 className="text-center my-4">{id === "new" ? "Create" : "Edit"} Appointment</h2>
           
            <AppointmentForm initial={appointment} onSubmit={save} />
        </div>
    );
}  