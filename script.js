var shoppingList = {
  products: [],
  addProduct: function(productName) {
    this.products.push({
      productName: productName,
      filtered: true,
    });
  },
  deleteProduct: function(position) {
    this.products.splice(position, 1);
  },
  filterProduct: function(position) {
    var product = this.products[position];
    product.filtered = !product.filtered;
  }
};

var handlers = {
  addProduct: function() {
    var addProductNameInput = document.getElementById('addProductNameInput');
    if (addProductNameInput.value !== '') {
      shoppingList.addProduct(addProductNameInput.value);
      addProductNameInput.value = '';
      view.displayProducts();
      document.getElementById("addProductNameInput").focus();  
    }
  },
  deleteProduct: function(position) {
    shoppingList.deleteProduct(position);
    view.displayProducts();
  },
  toggleFiltered: function() {
    var filterInput = document.getElementById('filterInput');
    
    shoppingList.products.forEach(function(product, position) {
      var productName = product.productName;
      var productId = position;
      product.filtered = true;
      if (productName.includes(filterInput.value) !== true) {
        shoppingList.filterProduct(productId);        
      }
    });
    view.displayProducts();
    filterInput.value = '';
    document.getElementById("filterInput").focus();  
  },
  printList: function() {
    view.printListHide();
    window.print();
    view.printListShow();
  },
};

var view = {
  displayProducts: function() {
    view.displayFilterAndPrint();   
    var productsul = document.querySelector('ul');
    productsul.innerHTML = '';
    
    shoppingList.products.forEach(function(product, position) {
      
      if (product.filtered === true) {
        var productLi = document.createElement('li');
        productLi.textContent = product.productName;
        productLi.appendChild(this.createDeleteButton())
        productsul.appendChild(productLi);
      }
    }, this);
  },
  displayFilterAndPrint: function() {
    var elementFilter = document.querySelector('.filterProduct');
    var elementPrint = document.querySelector('.printButton');
    if (shoppingList.products.length > 0) {
      elementFilter.style.visibility = 'visible';
      elementPrint.style.visibility = 'visible';
    } else {
      elementFilter.style.visibility = 'hidden';
      elementPrint.style.visibility = 'hidden';
    }
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton hide show';
    return deleteButton;
  },
  printListHide: function() {
    var hideElement = document.querySelectorAll('.hide');  
    var hidePrintButton = document.querySelector('.printButton');
    hidePrintButton.style.visibility = 'hidden';
    for (var i = 0; i < hideElement.length; i++) {
      hideElement[i].style.display = 'none';
    } 
  },
  printListShow: function() {
    var showElement = document.querySelectorAll('.show');  
    var showPrintButton = document.querySelector('.printButton');
    showPrintButton.style.visibility = 'visible';
    for (var i = 0; i < showElement.length; i++) {
      showElement[i].style.display = 'block';
    }
  },
  setUpEventListeners: function() {
    document.getElementById("addProductNameInput")
    .addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode == 13) {
        document.getElementById("add").click();
      }
    });
    document.getElementById("filterInput")
    .addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode == 13) {
        document.getElementById("filter").click();
      }
    });
    document.querySelector('ul').addEventListener('click', function(event) {
      var elementClicked = event.target;
    
          if (elementClicked.className === 'deleteButton hide show') {
            handlers.deleteProduct(parseInt(elementClicked.parentNode.id));
          }
    });  
  }
};
view.setUpEventListeners();
