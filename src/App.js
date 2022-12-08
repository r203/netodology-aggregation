import React from 'react';
import './App.css';
import moment from 'moment';

function YearTable(props) {
  // console.log('YearTable', props);

  return (
    <div>
      <h2>Year Table</h2>
      <table>
        <tr>
          <th>Year</th>
          <th>Amount</th>
        </tr>
        {props.list.map((item, index) => (
          <tr key={index}>
            <td>{item.year}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

function SortTable(props) {
  // console.log('SortTable', props.list);

  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <tr>
          <th>Date</th>
          <th>Amount</th>
        </tr>
        {props.list.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

function MonthTable(props) {
  // console.log('MonthTable', props);

  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <tr>
          <th>Month</th>
          <th>Amount</th>
        </tr>
        {props.list.map((item, index) => (
          <tr key={index}>
            <td>{item.month}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

// TODO:
// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state
export default class App extends React.Component {
  state = {
    list: []
  };

  componentDidMount() {
    let fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_AGREGATION_URL);
      if (!response.ok) {
      }

      const agregation = await response.json();
      this.setState(agregation)
    }

    fetchData();
  }

  render() {
    const { list } = this.state;
    // console.log(list);
    return (
      <div id="app">
        <MonthTableWithGroupMonth list={list} />
        <YearTable list={list} />
        <SortTableWithSortableTable list={list} />
      </div>
    );
  }
}

function withSortableTable(WrappedComponent) {
  class SortableTable extends React.Component {
    state = {
      list: []
    };

    componentDidUpdate(previousProps, previousState) {
      if (previousProps !== this.props) {
        let sortedList = this.props.list.sort((a, b) => {
          let curr = a.date.split('.').reverse().join();
          let prev = b.date.split('.').reverse().join();

          return curr < prev ? -1 : (curr > prev ? 1 : 0);
        })
        this.setState({ list: sortedList})
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  return SortableTable;
}

const SortTableWithSortableTable = withSortableTable(SortTable);

function withGroupMonth(WrappedComponent) {
  class GroupMonth extends React.Component {
    state = {
      list: [],
      newArray: []
    };

    componentDidUpdate(previousProps, previousState) {
      if (previousProps !== this.props) {
        // console.log(this.props.list);
          this.props.list.forEach(item => {

            this.setState([...this.state.newArray, this.state.newArray.item])
          // console.log(item.date);
          // let date = moment(item.date);
          // this.setState(this.state.list.push('123'))
          // {month: date.month(), amount: item.amount = item.amount + item.amount}
        });
        console.log(this.state.newArray);
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  return GroupMonth;
}

const MonthTableWithGroupMonth = withGroupMonth(MonthTable);