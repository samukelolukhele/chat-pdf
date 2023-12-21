import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className=" w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="center">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mt02">
            {isAuth && <Button>Go to Chats</Button>}
          </div>
          <p className="row-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professional to instantly
            answer questions and understand research with AI.
          </p>
          <div className="w-full mt-">
            {isAuth ? (
              <h1>fileupload</h1>
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get started! <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
