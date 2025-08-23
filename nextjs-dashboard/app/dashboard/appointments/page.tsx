import { RoundedCard } from '@/app/ui/Appointments/cards';
import DisplayAppointments from "@/app/ui/Appointments/display_appointments";
import WeeklyAppointments from "@/app/ui/Appointments/weekly_appointments";
export default function Page(): React.JSX.Element {
    if (!process.env.CALENDAR_ID || !process.env.USER_ID) {
        return <p>Environment variables for calendar or user ID are not set.</p>;
    }
    return(
        < RoundedCard  heading="Appointments" >
            <WeeklyAppointments
                    timezone= "Asia/Karachi"
            />
            {/* <DisplayAppointments
                params={{
                    calendarId:process.env.CALENDAR_ID,
                    startDate:`${Date.now()}`,
                    endDate:`${Date.now()+ (7 * 24 * 60 * 60 * 1000)}`,
                    timezone:"Asia/Karachi",
                    userId:process.env.USER_ID
                }}
            /> */}
        </RoundedCard>
    )    
}
