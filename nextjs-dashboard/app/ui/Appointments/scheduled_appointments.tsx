"use server";

interface Appointment {
  calendarId?: string;
  startDate: string;
  endDate: string;
  timezone: string;
  userId?: string;
}
export async function fetchAppointments(
    req: Appointment
    )
{
  const params = new URLSearchParams({
    calendarId: req.calendarId || process.env.CALENDAR_ID || '',
    startDate: req.startDate,
    endDate: req.endDate,
    timezone: req.timezone,
    userId: req.userId || process.env.USER_ID || '',
 })
  const url_var = new URL(`https://rest.gohighlevel.com/v1/appointments?${params.toString()}`);
  const res = await fetch(url_var.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.GHL_API}`
    },
    cache: "no-store", // always fresh
    method: "GET",
    //how to give the query para
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch appointments: ${res.statusText}`)
  }
  return res.json()
}