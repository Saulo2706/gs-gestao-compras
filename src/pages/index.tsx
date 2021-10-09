import { useContext } from "react";
import Layout from "../components/template/Layout";
import { AuthContext } from "../data/context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Layout>
        <h1>FirstName: {user?.firstName}</h1>
        <h1>Email: {user?.email}</h1>
        
        
      </Layout>
    </>
  )
}
