import React from 'react';
import SmartDataTable from 'react-smart-data-table';
import LoaderBox from './LoaderBox';
import './DataTable.css';
import { Container, Pagination } from 'semantic-ui-react';

const sematicUI = {
  segment: 'ui basic segment',
  table: 'ui compact selectable table',
}

class DataTable extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      bookList: [],
      totalBooks: 0,
      lastClickedBook: {},
      offset: 0,
      totalPages: 0,
      perPage: 20,
      activePage: 1
    }
  }

  componentDidMount () {
    this.setData(0);
  }

  setData = async (offset) => {
    const URL = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?offset=${offset}&api-key=${process.env.REACT_APP_API_KEY}`;
    try {
      const result = await fetch(URL);
      const data = await result.json();
      let dataList = [];
      data.results.forEach(item => {
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
        totalBooks: data.num_results,
        totalPages: data.num_results/this.state.perPage
      });

    } catch (err) {
      console.log("Error in fetching data: ", err);
    }
  }

 bookRowClick = (even, { rowData, rowIndex, tableData }) => {
      this.setState({
        lastClickedBook: rowData
      });
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({
      offset: (activePage - 1) * this.state.perPage,
      activePage: activePage
    });
    this.setData((activePage - 1) * this.state.perPage);
  }

  render () {
    const { bookList, lastClickedBook } = this.state;

    const PaginatorBox = ({
      activePage, totalPages, rows, perPage, onPageChange
    }) => {
      return (
        <Container textAlign="center">
          <Pagination activePage={this.state.activePage} totalPages={this.state.totalPages} onPageChange={this.handlePaginationChange} />
        </Container>
      )
    }

    return (
      <div>
        {bookList.length > 0 ? (
              <div className="DataTable">
                {Object.keys(lastClickedBook).length > 0 ?
                  (<Container textAlign="center">
                    <div className="detailsBox">
                      <strong> Author: </strong> {lastClickedBook.author} <br/>
                      <strong> Title: </strong> {lastClickedBook.title} <br/>
                      <strong> Publisher: </strong> {lastClickedBook.publisher} <br/>
                      <strong> Rank: </strong> {lastClickedBook.rank} <br/>
                    </div>
                  </Container>) : null
                }
                <div className={sematicUI.segment}>
                  <SmartDataTable
                    data={bookList}
                    name="book-list-table"
                    sortable
                    className={sematicUI.table}
                    onRowClick={this.bookRowClick}
                    perPage="20"
                    paginator={PaginatorBox}
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
