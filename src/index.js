import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


var PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
  { category: 'Sporting Goods', price: '$399.99', stocked: false, name: 'Git 7' }
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      inStockOnly: false
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }

  handleSearchTextChange(value) {
    this.setState({ searchText: value });
  }

  handleInStockOnlyChange(value) {
    this.setState({ inStockOnly: value });
  }

  render() {
    return (
      <div>
        <SearchBar searchText={this.state.searchText} onSearchTextChange={this.handleSearchTextChange} onCheckBoxChange={this.handleInStockOnlyChange} />
        <ProductTable products={this.props.products} searchText={this.state.searchText} inStockOnly={this.state.inStockOnly} />
      </div>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }
  handleInStockOnlyChange(e) {
    this.props.onCheckBoxChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <p>{this.props.searchText}</p>
        <input type="text" name="search" placeholder="search..." value={this.props.searchText} onChange={this.handleSearchTextChange}></input>
        <p>
          <input type="checkbox" name="checkbox" checked={this.props.inStockOnly} onChange={this.handleInStockOnlyChange} />Only show the products in stocks.
      </p>
      </form>
    )
  }
}

function ProductTable(props) {

  //sort the array by category
  const myProds = props.products.sort(function (prodA, prodB) {
    var x = prodA.category.toLowerCase();
    var y = prodB.category.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  })
  const row = [];
  var lastCategory = null;
  const filterText = props.searchText;
  myProds.forEach((prod) => {

    if (prod.name.indexOf(filterText) === -1) {
      return;
    }
    if (props.inStockOnly && !prod.stocked) {
      return;
    }
    if (prod.category !== lastCategory) {
      row.push(<ProductCategoryRow category={prod.category} />);
    }
    row.push(<ProductRow prod={prod} />);
    lastCategory = prod.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {row}
      </tbody>
    </table>
  );
}

function ProductRow(props) {
  var name = props.prod.stocked ?
    props.prod.name :
    <span style={{ color: 'red' }}>
      {props.prod.name}
    </span>
  return (
    <tr>
      <td>{name}</td>
      <td>{props.prod.price}</td>
    </tr>
  );
}
function ProductCategoryRow(props) {

  return (
    <tr>
      <th colSpan="2">{props.category}</th>
    </tr>
  )
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);


registerServiceWorker();
