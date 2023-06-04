import React from 'react'

function Dashboard({userData}:any) {
  console.log(userData);
  
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
// This function gets called at build time
// export async function getStaticProps() {

  // Call an external API endpoint to get data
  // const token = 
  /* 
  n the getStaticProps function, you cannot directly access the router.query object because getStaticProps runs at build time and does not have access to the request or query parameters.

If you need to access the token from the router.query object inside getStaticProps, you can pass it as a parameter to the function or store it in a separate variable before calling getStaticProps. Here's an example:

In the code above, the query object is passed as a parameter to the getStaticProps function. Inside the function, you can access the token value from query.token and use it for fetching data or performing other logic as needed.

Please note that in this case, you need to make sure you're passing the token value as a query parameter when calling the page where getStaticProps is defined. For example, when navigating to /dashboard?token=your-token-value, the getStaticProps function will have access to the token value through the query parameter.
  */

  // if(token){
  //   const res = await fetch(`${API_URL}/api/users/getUser`, {
  //     method: 'GET',
  //     credentials:"include",
  //     headers:{
  //     "Cookie":token
  //     }
  // });
  //   const userData = await res.json();
  
  //   return {
  //     props: {
  //       userData,
  //     },
  //   };
  // }

// }
export default Dashboard