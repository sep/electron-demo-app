import React from 'react';

export interface NumericInputType {
  getter: number;
  setter: (e:number)=>void;
}

export function NumericInput({ getter, setter }: NumericInputType) {
  return (
    <input type="number" value={getter} onChange={e => setter(parseFloat(e.target.value))} />
  );
}
