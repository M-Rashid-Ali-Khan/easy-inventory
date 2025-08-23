"use client";

import { RoundedCard } from "@/app/ui/Appointments/cards";
import { hfInference } from "@/app/query/hf_inference";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/ui/Appointments/button";
interface HFMessage {
  role: string;
  content: string;
  reasoning?: string;
}

interface HFChoice {
  index: number;
  message: HFMessage;
  finish_reason?: string;
}

interface HFResponse {
  choices?: HFChoice[];
  error?: string; // <- added optional error field
  [key: string]: any;
}
export default function Page(): React.JSX.Element {
  const [summary, setSummary] = useState<HFResponse | null>(null);
  const router = useRouter();
  function inference(data: string, mock?: boolean) {
    if (mock) {
      setSummary({
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content:
                "The schedule includes two consecutive confirmed bookings on the same calendar. The first appointment runs from 11 p.m. on August 21, 2025 to 3:30 a.m. on August 22, 2025, and the second follows immediately, lasting from 3:30 a.m. to 7:30 a.m. on August 22, 2025. Both are marked as booked and confirmed."
,
            },
          },
        ],
      });
      return;
    }
    hfInference({
      messages: [
        {
          role: "user",
          content:
            "You will be given a list of appointments." +
            "Summarize in a single paragraph, remove any ids that complicates." +
            "Use plain text format. Data: " +
            `${JSON.stringify(data)}`,
        },
      ],
      model: "openai/gpt-oss-120b:groq",
    })
      .then((response) => {
        setSummary(response);
      })
      .catch((error) => {
        console.error("Error fetching summary:", error);
        setSummary({ error: "Failed to fetch summary." });
      });
  }
  useEffect(() => {
    fetch(`/api/appointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        inference(data, true);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setSummary({ error: "Failed to fetch appointments." });
      });
  }, []); // <- empty dependency array = runs once on mount

  return (
    <RoundedCard heading="AI Summary">
      <div className="p-4">
        {/* <div
          onClick={() => {
            router.push("/dashboard/appointments");
          }}
        >
          Back
        </div> */}
        {summary ? (
          <div className="text-justify">
            {summary.choices
              ? summary.choices[0]?.message.content
              : summary.error}
          </div>
        ) : (
          <p>Loading summary...</p>
        )}
      </div>
    </RoundedCard>
  );
}
