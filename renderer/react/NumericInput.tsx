import React from 'react';

export interface NumericInputType {
  id: string
  getter: number;
  setter: (e:number)=>void;
}

export function NumericInput({ id, getter, setter }: NumericInputType) {
  return (
    <input id={id} type="number" value={getter} onChange={e => setter(parseFloat(e.target.value))} />
  );
}
