import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository } from './styles';

// repositories comes from destructuring props
const CompareList = ({ repositories, handleUpdate, handleDelete }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt="{repository.owner.login}" />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count}
            {' '}
            <small>stars</small>
          </li>
          <li>
            {repository.forks_count}
            {' '}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            {' '}
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            {' '}
            <small>last commit</small>
          </li>
        </ul>

        <footer>
          <button type="button" className="delete" onClick={() => handleDelete(repository.id)}>
            <i className="fa fa-times" />
          </button>
          <button
            type="button"
            className="refresh"
            onClick={() => handleUpdate(repository.owner.login, repository.name, repository.id)}
          >
            <i className="fa fa-spinner" />
          </button>
        </footer>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  //  'shape' means 'object' and let you define the proptypes of
  //  the object's child properties
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
};

export default CompareList;
