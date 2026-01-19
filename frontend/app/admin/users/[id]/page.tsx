"use client"
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

type User = {
  user: {
    id: string;
    name: string;
    password: string;
    email: string;
    role:string;
  };
};

const GET_USER_BY_ID = gql`
query GetUser($id: ID!){
user(id: $id){
id
name
password
email
role
}
}
`

export default  function UsersDetailPage({ params }: PageProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setUserId(resolvedParams.id);
    });
  }, [params]);

const {loading, error, data} = useQuery<User>(GET_USER_BY_ID, {
  variables: { id: userId },
  skip: !userId,
});
 if(loading) return "Laoding..."
 if(error) return `Error ! ${error.message}`;


  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <header className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
           {data?.user.name}
        </h1>
        <p className="text-gray-500 mt-1">{data?.user.email ?? "—"}</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-white border rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-3">UserDetails</h3>

          

          <dl className="mt-4 text-sm grid grid-cols-[120px_1fr] gap-y-2">
            <dt>ID</dt>
            <dd>{data?.user.id}</dd>

             <dt>Username</dt>
            <dd>{data?.user.name}</dd>

            <dt>Password</dt>
            <dd>{data?.user.password}</dd>


            <dt>Role</dt>
            <dd>{data?.user.role}</dd>


          </dl>
        </div>

        <aside className="bg-white border rounded-xl p-6 shadow">
         

          <div className="mt-6 flex flex-col gap-3">
          
         
            <Link
              href="/admin/users/edit"
              className="px-4 py-2 border rounded-lg text-center hover:bg-gray-50"
            >
              Edit
            </Link>
            

            <Link
              href="/admin/users"
              className="px-4 py-2 border rounded-lg text-center hover:bg-gray-50"
            >
              Back
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
