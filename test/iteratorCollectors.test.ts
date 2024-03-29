import { describe, expect } from 'vitest';
import { it, fc } from '@fast-check/vitest';
import { Iterator } from '../src';

describe.concurrent('iterator', () => {
  it.concurrent.prop([fc.dictionary(fc.string(), fc.anything())])(
    'Iterator.iterEntries.toObject',
    (dict) => {
      const actual = Iterator.iterEntries(dict).toObject();
      expect(actual).toEqual(dict);
    }
  );

  it.concurrent.prop([fc.array(fc.tuple(fc.string(), fc.anything()))])(
    'Iterator.toObject',
    (array) => {
      const actual = Iterator.iter(array).toObject();
      expect(actual).toEqual(Object.fromEntries(array));
    }
  );

  it.concurrent.prop([fc.array(fc.anything())])('Iterator.toSet', (array) => {
    const actual = Iterator.iter(array).toSet();
    expect(actual).toEqual(new Set(array));
  });

  it.concurrent.prop([fc.array(fc.tuple(fc.anything(), fc.anything()))])(
    'Iterator.toMap',
    (array) => {
      const actual = Iterator.iter(array).toMap();
      expect(actual).toEqual(new Map(array));
    }
  );

  it.concurrent.prop([fc.array(fc.anything())])('Iterator.toArray', (array) => {
    const actual = Iterator.iter(array).toArray();
    expect(actual).toEqual(array);
  });
});
