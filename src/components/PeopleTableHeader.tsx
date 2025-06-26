import { SearchLink } from './SearchLink';
import classNames from 'classnames';

interface Props {
  sort: string | null;
  order: string;
}

export const PeopleTableHeader: React.FC<Props> = ({ sort, order }) => {
  const getSortParams = (field: string): Record<string, string | null> => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order === 'asc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <SearchLink
              params={getSortParams('name')}
              className={classNames({ 'is-active': sort === 'name' })}
            >
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <SearchLink
              params={getSortParams('sex')}
              className={classNames({ 'is-active': sort === 'sex' })}
            >
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <SearchLink
              params={getSortParams('born')}
              className={classNames({ 'is-active': sort === 'born' })}
            >
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <SearchLink
              params={getSortParams('died')}
              className={classNames({ 'is-active': sort === 'died' })}
            >
              <span className="icon">
                <i className="fas fa-sort" />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
