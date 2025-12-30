import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { TimePeriod } from '../../types/crypto.types';

interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

export default function TimePeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: TimePeriodSelectorProps) {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newPeriod: TimePeriod | null) => {
    if (newPeriod !== null) {
      onPeriodChange(newPeriod);
    }
  };

  return (
    <ToggleButtonGroup
      value={selectedPeriod}
      exclusive
      onChange={handleChange}
      aria-label="time period"
    >
      <ToggleButton value={7} aria-label="7 days">
        7 Days
      </ToggleButton>
      <ToggleButton value={14} aria-label="14 days">
        14 Days
      </ToggleButton>
      <ToggleButton value={30} aria-label="30 days">
        30 Days
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
