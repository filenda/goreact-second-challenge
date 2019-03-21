import React, { Component } from 'react';
import moment from 'moment';

import api from '../../services/api';
import logo from '../../assets/logo.png';

import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentWillMount() {
    const repos = localStorage.getItem('repos');

    if (repos) {
      this.setState({ repositories: JSON.parse(repos) });
    }
  }

  handleUpdateRepository = async (author, name, id) => {
    console.log(`id passado para atualização: ${author} e ${name} e ${id}`);

    try {
      const { data: repository } = await api.get(`/repos/${author}/${name}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      const repos = this.state.repositories;

      const updatedRepos = repos.filter(repo => repo.id !== id);

      this.setState(
        {
          repositories: [...updatedRepos, repository],
        },
        () => {
          localStorage.setItem('repos', JSON.stringify(this.state.repositories));
        },
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDeleteRepository = (id) => {
    console.log(`id passado par delecao: ${id}`);
    const repos = this.state.repositories;

    const updatedRepos = repos.filter(repo => repo.id !== id);

    this.setState({ repositories: updatedRepos }, () => {
      localStorage.setItem('repos', JSON.stringify(updatedRepos));
    });
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      // '.fromNow()' brings the difference between one datetime and now
      // e.g. 'one hour from now'
      // REMINDER: It's a best practice to format an info beforehand
      // (just like bellow ex.). Do not format data on the component's
      // 'reander()' method to avoid overhead
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState(
        {
          repositoryInput: '',
          repositories: [...this.state.repositories, repository],
          repositoryError: false,
        },
        () => {
          localStorage.setItem('repos', JSON.stringify(this.state.repositories));
        },
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="GitHub Compare" />

        {/* this 'withError' property can be read on the styled component 'Form'
          using 'props' (see styles.js) */}
        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}
          </button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          handleUpdate={this.handleUpdateRepository}
          handleDelete={this.handleDeleteRepository}
        />
      </Container>
    );
  }
}
