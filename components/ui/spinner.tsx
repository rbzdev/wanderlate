"use client";

import React from "react";
import { Icon } from "@iconify/react";

export interface SpinnerProps {
    size?: number; // px
    color?: string;
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
    className = "",
}) => (
    <Icon
        icon="ri:loader-5-line"
        className={`animate-spin ${className}`}
    />
);

export default Spinner;
