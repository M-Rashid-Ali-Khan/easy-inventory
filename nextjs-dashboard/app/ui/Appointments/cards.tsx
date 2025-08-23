import React, { ReactNode } from 'react';

interface CardProps {
    heading: string;
    children: ReactNode;
}

export function RoundedCard({ heading, children }: CardProps) {
    return (
        <div
      className="
        rounded-2xl shadow-lg bg-white 
        p-6 
        w-[90vw] max-w-md     /* mobile: fits nicely */
        md:max-w-2xl md:w-[70vw]  /* tablet: wider */
        lg:max-w-4xl lg:w-[60vw]  /* desktop: bar-like */
        xl:max-w-6xl xl:w-[50vw]  /* big monitors: wide but centered */
        mx-auto                /* always centered */
        transition-all duration-300
      "
    >
            <h2 className="text-lg font-semibold mb-4">{heading}</h2>
            <div className="bg-gray-50 rounded-md p-4">
                {children}
            </div>
        </div>
    );
}