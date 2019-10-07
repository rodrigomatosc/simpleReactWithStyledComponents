import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Loading, Owner, IssueList, SpanLabel } from './style';
import Container from '../../components/Container';

// import { Container } from './styles';
class Repository extends Component {
  static propTypes = {
    match: Proptypes.shape({
      params: Proptypes.shape({
        repository: Proptypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    console.log('olass');

    const { match } = this.props;
    const nameOfRepository = decodeURIComponent(match.params.repository);
    const [repository, issues] = await Promise.all([
      api.get(`repos/${nameOfRepository}`),
      api.get(`repos/${nameOfRepository}/issues`, {
        params: { state: 'open', per_page: 5 },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return <Loading>Loading...</Loading>;
    }

    console.log(issues);
    console.log('teste');

    return (
      <Container>
        <Owner>
          <Link to="/">Return to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <SpanLabel color={label.color} key={String(label.id)}>
                      {label.name}
                    </SpanLabel>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}

export default Repository;
