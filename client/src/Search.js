import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }

export default class SearchStandard extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = async (e, { value }) => {
    this.setState({ isLoading: true, value, results: [] })

    const response = await fetch(`/api/search?q=${value}`);
    const results = await response.json();

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      this.setState({
        isLoading: false,
        results,
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={16}>
          <Search
            size="big"
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
