

function orders( ){

	var that = this;
	this. desination_bridge_name= "clips";
	this. order_topic_name= "order";
	this. product_topic_name= "product";
	this. wedgit_id= 	"orders_wedgit";

	this. $wedgit_div= $("<div>  </div>").append("<h2> Orders: </h2>")
										.addClass("col_element").attr('id',this.wedgit_id);// div contaning the wedgit


	window.$production.prepend(this.$wedgit_div);//the wedgit container
	
	this.visualize = function( robot_info ){

		// $(document).ready(function()
		// {
		// 	// window.$layout_container.append(window.$production);

		//to listen to the  incase the product widget not instialized
	    // 	var product_facts_listener = new ROSLIB.Topic({
			  //   ros : ros,
			  //   name : destination_bridge_name +"/" + product_topic_name ,
			  //   messageType : 'mm',
			  //   throttle_rate:1000,
		  	// });

		  	// product_facts_listener.subscribe(function(message) 
		  	// {
		  	// 	product_facts=message;

		  	// });


	    	var order_facts_listener = new ROSLIB.Topic({
			    ros : robot_info.connection,
			    name : "clips" +"/" + that.order_topic_name ,
			    messageType : 'mm',
			    throttle_rate:window.throttle_rate,
		  	});
		  	order_facts_listener.subscribe(function(message) 
		  	{
		  		$("#"+that.wedgit_id).empty();// clear the div
		  		$("#"+that.wedgit_id).append("<h2> Orders: </h2>");

		  		order_facts= message;

		  		if( product_facts != null)
		  		{
					for( var order in order_facts.order )
					{
						for( var product in product_facts.product )
						{
							if (JSON.parse(product_facts.product[product].id) == JSON.parse( order_facts.order[order]["product-id"] ))
			  				{
								var $order_div=$("<div> </div>").addClass("order");// the class order is given to  each one of the orders_divs that contain the product div 
								var $product_div=$("<div> </div>").addClass("product").attr('id',"product_"+product_facts.product[product].id);// the class 'produced' is given to the div containing  peace itself
								
								var base_color = product_facts.product[product].base[0];
								$product_div.prepend("<div class=products_base style= background-color:"+base_color+"> </div>");
								
								for( var ring_index in product_facts.product[product].rings )
								{
									var ring_color = product_facts.product[product].rings[ring_index];
									$product_div.prepend("<div class='products_ring "+ring_index +"' style= background-color:"+ring_color+"> </div>");
								}
								
								var cap_color = product_facts.product[product].cap[0];
								$product_div.prepend("<div class=products_cap style= background-color:"+cap_color+"> </div>");


								//order info
								if(JSON.parse( order_facts.order[order]["in-production"][0] ) == 1)
								{
									$order_div.addClass("active-order")
								}

								var $order_info=$("<div> </div>").addClass("order_info");
								$order_info.append("<span> Gate: </span>").append("<span>"+ order_facts.order[order]["delivery-gate"][0]+"</span>").append("<br>");
								$order_info.append("<span>"+ order_facts.order[order]["begin"][0] + ":" + order_facts.order[order]["end"][0]+"</span>").append("<br>");
								$order_info.append("<span>"+ order_facts.order[order]["quantity-delivered"][0] + "/" + order_facts.order[order]["quantity-requested"][0]+"</span>").append("<br>");

								$order_div.append($product_div);
								$order_div.append($order_info);

								$("#"+that. wedgit_id).append($order_div); //div will hold this product	  				

			  				}
						}
					}
		  		}
		  	});
		// });
	};
}

