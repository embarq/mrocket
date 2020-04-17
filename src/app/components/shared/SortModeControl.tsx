import React, { useState } from 'react';

enum SortMode {
  Descending = 'descending',
  Ascending = 'ascending'
}

interface SortModeControlProps {
  mode?: SortMode;
}

function SortModeControl(props: SortModeControlProps) {
  const [mode, setMode] = useState(SortMode.Ascending);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value as SortMode);
  }

  if (props.mode != null) {
    setMode(props.mode);
  }

  return (
    <select value={mode} onChange={handleSelectionChange} className="form-control">
      <option value={SortMode.Descending}>Descending</option>
      <option value={SortMode.Ascending}>Ascending</option>
    </select>
  )
}

export default SortModeControl;