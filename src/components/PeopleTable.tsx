/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { useFilters } from '../hooks/useFilters';
import { PeopleTableHeader } from './PeopleTableHeader';
import { useSearchParams } from 'react-router-dom';

interface Props {
  people: Person[] | null;
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { filteredPeople } = useFilters(people);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHeader sort={sort} order={order} />

      <tbody>
        {filteredPeople.map((person: Person) => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className="has-background-warning"
            >
              <td>
                <a className="has-text-danger" href={`#/people/${person.slug}`}>
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.motherName}</td>
              <td>{person.fatherName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
