import React, { Component } from 'react';
import { FaGitAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './styles';
import api from '../../services/api';
import Container from '../../components/Container';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    console.log('veio aqui');
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };

    this.setState({
      loading: false,
      repositories: [...repositories, data],
      newRepo: '',
    });
  };

  render() {
    const { newRepo, loading, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGitAlt />
          Ropositories
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add Repository"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              {repository.name}
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
