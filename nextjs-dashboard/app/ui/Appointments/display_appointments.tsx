"use client";

import { fetchAppointments } from '@/app/ui/Appointments/scheduled_appointments';

export default function DisplayAppointments(
  { params }: {
    params: any[];
  }
): React.JSX.Element {
  // Log the params to see what is being passed
  //console.log("DisplayAppointments called with params:", params);
  //apt_list has json objects, droping the ones which do not have this key: start_time
    const listt = params.filter((appointment: any) => appointment.start_time);
  return (
    <div className="flex flex-col items-center justify-center">
      <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {listt.map((appointment: any) => (
          <li
            key={appointment.id}
            className="border-b border-gray-200 py-3 last:border-b-0"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">
                Status:{" "}
                <span className="text-blue-600">{appointment.status}</span>
              </span>
              <span className="font-semibold text-gray-700">
                Appointment Status:{" "}
                <span className="text-green-600">
                  {appointment.appoinment_status}
                </span>
              </span>
              <span className="text-sm text-gray-500">
                Start: {new Date(appointment.start_time).toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">
                End: {new Date(appointment.end_time).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
