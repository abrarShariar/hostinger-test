import React from 'react';
import SmartDataTable from 'react-smart-data-table';
import LoaderBox from './LoaderBox';

const sematicUI = {
  segment: 'ui basic segment',
  message: 'ui message',
  input: 'ui icon input',
  searchIcon: 'search icon',
  rowsIcon: 'numbered list icon',
  table: 'ui compact selectable table',
  select: 'ui dropdown',
  refresh: 'ui labeled primary icon button',
  refreshIcon: 'sync alternate icon',
  change: 'ui labeled secondary icon button',
  changeIcon: 'exchange icon',
  checkbox: 'ui toggle checkbox',
  loader: 'ui active text loader',
  deleteIcon: 'trash red icon',
}


class DataTable extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      bookList: [],
      totalBooks: 0
    }
  }

  componentDidMount () {
    // to-do: move http stuffs to service
    this.setData();
  }

  setData = async () => {
    const URL = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${process.env.REACT_APP_API_KEY}`;
    try {
      const result = await fetch(URL);
      const data = await result.json();
      let dataList = [];
      data.results.forEach(item => {
        console.log(item.ranks_history);
        let filteredItem = {
          author: item.author,
          title: item.title,
          publisher: item.publisher,
          rank: item.ranks_history.length > 0 ? item.ranks_history[0]['rank'] : 0
        }
        dataList.push(filteredItem);
      });

      this.setState({
        bookList: dataList,
        totalBooks: data.num_results
      });

    } catch (err) {
      console.log("Error in fetching data: ", err);
    }
  }

  render () {
    const { bookList } = this.state;
    return (
      <div>
        {bookList.length > 0 ? (
          <div className="DataTable">
            <div className={sematicUI.segment}>
              <SmartDataTable
                data={bookList}
                name="book-list-table"
                sortable
                className={sematicUI.table}
              />
            </div>
          </div>
        ): (
          <LoaderBox/>
        )
      }
      </div>
    )
  }
}

export default DataTable;
