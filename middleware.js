import { withAuth } from "next-auth/middleware";
const middleware = withAuth({
  pages: {
    signIn: "/auth/signin"  //redrect user unauthenticated
  }
})
export default middleware
export const config = {
  matcher: [
    "/stepper/:path*", //protected routess
    "/",
    "!/auth/signin",     // Exclude the login page from middleware checks
  ]
}


// import { withAuth } from "next-auth/middleware";

// const middleware = withAuth({
//   pages: {
//     signIn: "/auth/signin", //redrect user unauthenticated
//   },
// });

// export default middleware;

// export const config = {
//   matcher: [
//     "/stepper/:path*", //protected routess
//     "/",   
//     "",  
//   ],
// };
