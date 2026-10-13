import { useEffect } from 'react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { initAtmosphere, toggleCinema, toggleSound, useAtmosphere } from '@/lib/atmosphere';

export function AtmosphereInit() { useEffect(() => initAtmosphere(), []); return null; }

function Bars({ on, pulse }: { on: boolean; pulse: number }) {
  return <span className={`eq ${on ? 'on' : ''}`} key={pulse} aria-hidden="true"><i /><i /><i /><i /></span>;
}

export function HeaderControls() {
  const { sound, cinema, pulse } = useAtmosphere();
  return <div className="atm">
    <button type="button" data-sfx className="atm-btn" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? 'Turn sound off' : 'Turn sound on'}>
      {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}<Bars on={sound} pulse={pulse} />
    </button>
    <button type="button" data-sfx className={`atm-btn atm-cin ${cinema ? 'on' : ''}`} onClick={toggleCinema} aria-pressed={cinema} aria-label="Cinema mode">
      <Sparkles size={14} /><span>Cinema</span>
    </button>
  </div>;
}

export function CornerHud() {
  const { sound, cinema, pulse } = useAtmosphere();
  return <div className="hud glass" role="group" aria-label="Sound and cinema mode">
    <button type="button" data-sfx onClick={toggleSound} aria-pressed={sound}>AUDIO <Bars on={sound} pulse={pulse} /> {sound ? 'ON' : 'OFF'}</button>
    <span aria-hidden="true">•</span>
    <button type="button" data-sfx onClick={toggleCinema} aria-pressed={cinema}>CINEMA {cinema ? '01' : '00'}</button>
  </div>;
}
