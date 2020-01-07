const Handlebars = require("handlebars");


//HandlebarsHelper
Handlebars.registerHelper('createPagination',
function (totalPage, currentPage){
  let arr = '';
  let i = 1;
  //var link = getSearchLink();
  //console.log(link);
  while(i <= totalPage){
    arr = arr.concat(`<li class="page-item ${i === currentPage ?'active' : ''}"><a class="page-link" href="/products/?page=${i}&limit=5">${i}</a></li>`);
    i++;
  }
  let result = `<nav aria-label="Page navigation">
  <ul class="pagination">
    <li class="page-item ${currentPage - 1 < 1 ? 'disabled' : ''}"><a class="page-link" href="/products?page=${currentPage - 1}&limit=5">Previous</a></li>
    ${arr}
    <li class="page-item ${currentPage + 1 > totalPage ? 'disabled' : ''}"><a class="page-link" href="/products?page=${currentPage + 1}&limit=5">Next</a></li>
  </ul>
</nav>`;
  console.log(result);
  return result;
}
);
//end HandlebarHelper