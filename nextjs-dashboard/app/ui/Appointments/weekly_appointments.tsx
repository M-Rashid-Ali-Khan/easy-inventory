"use client";

import { fetchAppointments } from '@/app/ui/Appointments/scheduled_appointments';
import DisplayAppointments from '@/app/ui/Appointments/display_appointments';
import Button from '@/app/ui/Appointments/button';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// make it refresh on button click

export default function WeeklyAppointments(
    props: {
        timezone: string;
    }
): React.JSX.Element {
    const [appointments, setAppointments] = useState([]);
    const router = useRouter();
    useEffect(() => {
        fetchAppointmentsFromServer();
    }, []);
    async function fetchAppointmentsFromServer() {
        const params = {
            startDate: `${Date.now()}`,
            endDate: `${Date.now() + (7 * 24 * 60 * 60 * 1000)}`,
            timezone: props.timezone,
        }
        const data = await fetchAppointments(params);
        //console.log("Fetched appointments:", data);
        //Removing duplicate entries with same id
        data.appointments = data.appointments.filter((appointment: any) => appointment.start_time);
        setAppointments(data.appointments || []);
        fetch(`/api/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ appointments: data.appointments }),
        }).then((response) => { 
            if (!response.ok) {
                throw new Error("Failed to store appointments");
            }}).catch((error) => {
            console.error("Error storing appointments:", error);
        })
    }
    return (
        <>
        <div className="flex flex-row items-center justify-center mb-4 gap-4">
            <Button onClick={() => { fetchAppointmentsFromServer() }} >
                Refresh
            </Button>
            <Button
                onClick={() => {
                    window.open("https://link.personaline.ai/widget/booking/YmlVlzWb0ZHelvSWviyr", "_blank");
                }}
            >
                Book Now
            </Button>
            <Button
                onClick={() => {
                    router.push("/dashboard/appointments/summary");
                }}
            >
                Summarize
            </Button>
            </div>
            <DisplayAppointments
                params={appointments}
            />
        </>
    );
}