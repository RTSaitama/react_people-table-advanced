import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Person } from '../types';

export const useFilters = (people: Person[] | null) => {
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const name = searchParams.get('name')?.toLowerCase().trim() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';
  const query = searchParams.get('query') || '';

  const filteredPeople = useMemo(() => {
    if (!people) {
      return [];
    }

    let result = [...people];

    result = result
      .filter(
        person =>
          !query ||
          person.name
            .toLowerCase()
            .trim()
            .includes(query.toLowerCase().trim()) ||
          (person.fatherName ?? '')
            .toLowerCase()
            .trim()
            .includes(query.toLowerCase().trim()) ||
          (person.motherName ?? '')
            .toLowerCase()
            .trim()
            .includes(query.toLowerCase().trim()),
      )
      .filter(person => !sex || person.sex === sex)
      .filter(person => {
        const preparedName = person.name.toLowerCase().trim();

        return !name || preparedName.includes(name);
      })
      .filter(person => {
        if (centuries.length === 0) {
          return true;
        }

        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });

    if (sort) {
      const reverse = order === 'asc' ? 1 : -1;

      result.sort((a, b) => {
        switch (sort) {
          case 'name':
            return a.name.localeCompare(b.name) * reverse;
          case 'sex':
            return a.sex.localeCompare(b.sex) * reverse;
          case 'born':
            return (a.born - b.born) * reverse;
          case 'died':
            return (a.died - b.died) * reverse;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [people, sex, name, centuries, sort, order, query]);

  return { sex, name, centuries, sort, order, query, filteredPeople };
};
