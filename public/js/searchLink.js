
function SetOptions(brand, price, sort, order)
{
			console.log("hello " + brand);
			var arr = document.getElementsByName("brandcheck")
			for(i = 0; i < arr.length; i++) {
				console.log("hello");

				if(arr[i].value === brand)
				{
					console.log("found you")
					arr[i].checked = true;
				}
                        
            }

			arr = document.getElementsByName("pricecheck")
			for(i = 0; i < arr.length; i++) { 
				
				if(arr[i].value === price)
				{
					arr[i].checked = true;
				}
						
			}
			
			if (sort && order)
			{
				var sortSelect = document.getElementById("inputGroupSelect01");
				sortSelect.selectedIndex = sort;

				var orderSelect = document.getElementById("inputGroupSelect02");
				
				if (order == 1)
				{
					orderSelect.selectedIndex = 1;
				}
				else
				{
					orderSelect.selectedIndex = 2;
				}

			}
}

function getSearchLink()
{
	//?brand=...&price=...
            var brand;
			var arr = document.getElementsByName("brandcheck")
			for(i = 0; i < arr.length; i++) { 
				
				if(arr[i].checked)
				{
					brand = arr[i].value;
				}
                        
            }

			var price;
			arr = document.getElementsByName("pricecheck")
			for(i = 0; i < arr.length; i++) { 
				
				if(arr[i].checked)
				{
					price = arr[i].value;
				}
                        
			}
			
			var link = "/products/search/" + "?brand=" + brand + "&price=" + price;


			//get sort option if there's one
			var sort = document.getElementById("inputGroupSelect01");
			var sortValue = sort[sort.selectedIndex].value;

			var order = document.getElementById("inputGroupSelect02")
			orderValue = order[order.selectedIndex].value;

			if (sortValue!="0" && orderValue!="0")
			{
				link += "&sort=" + sortValue + "&by=" + orderValue;
			}

			document.getElementById("filterButton").href = link;
}