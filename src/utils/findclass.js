

// // Make an AJAX request to fetch the data from the server-side
// $.ajax({
// 	url: "/findclass", // Replace with your server-side endpoint to fetch the data
// 	method: "GET",
// 	success: function (data) {
// 		// Iterate through the results and generate the HTML structure for each item
// 		data.forEach(function (item) {
// 			var html = `
//             <div id="card-1">
//                 <img src="public/images/guru/${item.profile_picture}" id="card-1-img-top" alt="..." />
//                 <div id="card-body">
//                     <h4 id="card-1-title">${item.teacher_name}</h4>
//                     <h4 id="card-1-sub-title">${item.subject_name}</h4>
//                     <h4 id="card-1-price">Rp. ${item.min_price}</h4>
//                     <a href="/find-class/:id_teacher" id="btn-card-1">Go somewhere</a>
//                 </div>
//             </div>
//             `;
// 			// Append the generated HTML to a container element on the /findclass page
// 			$("#content-group").append(html); // Replace #content-group with the appropriate selector for the container element on the /findclass page
// 		});
// 	},
// 	error: function () {
// 		console.log("Error occurred while fetching data");
// 	},
// });
			// <% jsonData.forEach(function(item) { %>
			// <div id="card-1">
			// 	<img
			// 		src="public/images/guru/<%= item.profile_picture %>"
			// 		id="card-1-img-top"/>
			// 	<div id="card-1-body">
			// 		<h4 id="card-1-title"><%= item.teacher_name %></h4>
			// 		<h4 id="card-1-sub-title"><%= item.subject_name %></h4>
			// 		<h4 id="card-1-price">Rp. <%= item.min_price %></h4>
			// 		<a href="/find-class/<%= item.id_teacher %>" id="btn-card-1"
			// 			>Go somewhere</a
			// 		>
			// 	</div>
			// </div>
			// <% }); %>