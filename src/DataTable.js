import React from 'react';

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
    this.getData();
  }

  getData = async () => {
    const URL = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${process.env.REACT_APP_API_KEY}`;
    try {
      const result = await fetch(URL);
      const data = await result.json();
      let dataList = [];

      data.results.forEach(item => {
        let filteredItem = {
          author: item.author,
          title: item.title,
          publisher: item.publisher
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
      <div className="DataTable">
        {bookList.map(book => {
          return (
            <li>{book.author}</li>
          )
        })}
      </div>
    )
  }
}

export default DataTable;
