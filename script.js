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
    var input = document.getElementById('filterInput');
    var filter = input.value.toUpperCase();
    var ul = document.querySelector('ul');
    var li = ul.getElementsByTagName('li');
    for (var i = 0; i < li.length; i++) {
      if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
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
      var productLi = document.createElement('li');
      productLi.textContent = product.productName;
      if ()
      productLi.appendChild(this.createDeleteButton())
      productsul.appendChild(productLi);
    }, this);
  },
  displayFilterAndPrint: function() {
    var elementFilter = document.querySelector('.filterProduct');
    var elementPrint = document.querySelector('.printButton');
    if (shoppingList.products.length) {
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
      showElement[i].style.display = 'inline';
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
      handlers.toggleFiltered();
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
