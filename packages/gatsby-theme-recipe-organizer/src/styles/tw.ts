import tailwind from './tailwind.module.css';

import { Class as TailwindClass } from './tailwind';

export default function tw(cls: TailwindClass) {
  return tailwind[cls];
}

export function map(classes: TailwindClass[]) {
  return classes.map(tw);
}
