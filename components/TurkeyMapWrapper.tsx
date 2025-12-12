// Turkey Map Component Wrapper
'use client';

import React from 'react';
import TurkeyMap from 'turkey-map-react';
import { TurkeyMapWrapperProps } from '@/lib/types';
import { REGION_COLORS } from '@/lib/constants';

export default function TurkeyMapWrapper({ 
  onHover, 
  onClick, 
  selectedProvince 
}: TurkeyMapWrapperProps) {
  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="w-full max-w-5xl">
        <TurkeyMap
          hoverable={true}
          onHover={({ plateNumber, name }) => onHover({ name, plateNumber })}
          onClick={({ plateNumber, name }) => onClick({ name, plateNumber })}
          customStyle={{
            idleColor: '#F1F5F9',
            hoverColor: '#3B82F6'
          }}
        />
      </div>
    </div>
  );
}
