function products()
{
	var that = this; 

	this.  destination_bridge_name= "clips";
	this.  product_topic_name= "product";
	this.  wedgit_id= 	"products_wedgit";
	this.  $wedgit_div__= $("<div>  </div>").addClass("col_element").attr('id',this.wedgit_id);// div contaning the wedgit

	// window.$layout_container.append($wedgit_div);//the wedgit container
	window.$production.append(this.$wedgit_div__);//the wedgit container



	this.visualize = function( robot_info){

		$(document).ready(function()
		{
	    	var product_facts_listener = new ROSLIB.Topic({
			    ros : robot_info.connection,
			    name : "clips" +"/" + that.product_topic_name ,
			    messageType : 'mm',
			    throttle_rate:window.throttle_rate,
		  	});

		  	product_facts_listener.subscribe(function(message)
		  	{
		  		product_facts=message;
		  		$("#"+that.wedgit_id).empty();// clear the div
		  		$("#"+that.wedgit_id).append("<h2> Products:</h2>");

		  		if( order_facts != null)
		  		{
		  			for( var product in product_facts.product )
					{

						if (JSON.parse(product_facts.product[product]["product-id"]) !=0 )//A product that describes a production process
						{

							var related_order;
							for( var product_index2 in product_facts.product)
							{
								if (JSON.parse(product_facts.product[product_index2].id) == JSON.parse(product_facts.product[product]["product-id"]) )
				  				{
				  					related_order = product_facts.product[product_index2];
				  				}
							}



							var $product_div=$("#product_"+product_facts.product[product]["product-id"]).clone();//Make a similare DIV
							$product_div.attr('id',"product_"+product_facts.product[product].id);

							$product_div.children().addClass("part_processing");//set all the part to still processing

							if (product_facts.product[product].base[0] == related_order.base[0] )
							{
								$product_div.children(".products_base").removeClass("part_processing").addClass("part_complete");
							}


							for( var ring_index in product_facts.product[product].rings )
							{
								if (product_facts.product[product].rings[ring_index] == related_order.rings[ring_index])
								{
							 		$product_div.children(".products_ring."+ring_index).removeClass("part_processing").addClass("part_complete");
								}
							}

							if (product_facts.product[product].cap[0] == related_order.cap[0])
							{
								$product_div.children(".products_cap").removeClass("part_processing").addClass("part_complete");
							}

							$("#"+that.wedgit_id).append($product_div); //div will hold this product

						}

					}
		  		}
		  	});
		});


	};

}


// function products(){

// 	var destination_bridge_name= "clips";
// 	var topic_name= "product";
// 	var wedgit_id= 	"products_wedgit";

// 	window.$layout_container.append("<div id="+wedgit_id+"  class=wedgit>  </div>");//the wedgit container

// 	$(document).ready(function()
// 	{
//     	var prefiexed_topic_name = destination_bridge_name +"/" + topic_name ;

//     	var listener = new ROSLIB.Topic({
// 		    ros : ros,
// 		    name : prefiexed_topic_name,
// 		    messageType : 'mm',
// 		    throttle_rate:1000,
// 	  	});
// 	  	listener.subscribe(function(message)
// 	  	{
// 	  		$("#"+wedgit_id).empty();// clear the div

// 	  		for (var key in message)//present the content in the div
// 	  		{
// 	  			if(message[key].constructor === Array)
// 	  			{

// 	  				for( var fact in message[key] )
// 	  				{
// 	  					var $product_div=$("<div> </div>");
// 	  					$product_div.addClass("products").attr('id',"product_"+message[key][fact].id);

// 		  				var base_color = message[key][fact].base[0];
// 		  				$product_div.prepend("<div class=products_base style= background-color:"+base_color+"> </div>");

// 		  				for( var ring_index in message[key][fact].rings )
// 		  				{
// 		  					var ring_color = message[key][fact].rings[ring_index];
// 		  					$product_div.prepend("<div class=products_ring style= background-color:"+ring_color+"> </div>");
// 		  				}

// 		  				var cap_color = message[key][fact].cap[0];
// 		  				$product_div.prepend("<div class=products_cap style= background-color:"+cap_color+"> </div>");



// 		  				$("#"+wedgit_id).append($product_div); //div will hold this product
// 	  				}
// 	  			}
// 	  		}
// 	  	});
// 	});
// }





