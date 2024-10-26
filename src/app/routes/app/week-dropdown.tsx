import Dropdown from '../../../components/ui/dropdown';
import React from 'react';
import { useUrlParams } from '../../../hooks/useUrlParams';
import { range } from 'lodash';

export default function WeekDropdown() {
  const { week, setWeek } = useUrlParams();
  const weeks = range(1, 9).map(String);

  return (
    <Dropdown
      options={weeks}
      onChange={setWeek}
      value={week.toString()}
      label={'Select Week'}
    />
  );
}
