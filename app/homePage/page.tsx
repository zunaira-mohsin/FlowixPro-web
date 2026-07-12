// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center gap-4">
//       <Link
//         href="/login"
//         className="rounded bg-black px-6 py-3 text-white"
//       >
//         Login
//       </Link>

//       <Link
//         href="/signup"
//         className="rounded bg-blue-600 px-6 py-3 text-white"
//       >
//         Sign Up
//       </Link>
//     </div>
//   );
// }
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/signup");
}