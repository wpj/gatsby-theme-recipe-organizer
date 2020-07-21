import React from 'react';

import { FormPreset } from './types';
import Form from './form';

interface Props {
  query?: string;
  preset: FormPreset;
}

export default function Search({ preset, query }: Props) {
  return <Form preset={preset} initialQuery={query} />;
}
