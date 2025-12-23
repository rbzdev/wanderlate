'use client';

import { useState, ReactNode } from 'react';

interface TabStateWrapperProps {
  children: (activeTab: string, setActiveTab: (tab: string) => void) => ReactNode;
}

export default function TabStateWrapper({ children }: TabStateWrapperProps) {
  const [activeTab, setActiveTab] = useState('Réservations');
  
  return <>{children(activeTab, setActiveTab)}</>;
}
