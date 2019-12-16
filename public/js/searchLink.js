
function SetOptions(brand, price)
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
}

function getSearchLink()
{
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
			document.getElementById("filterButton").href = link;
}