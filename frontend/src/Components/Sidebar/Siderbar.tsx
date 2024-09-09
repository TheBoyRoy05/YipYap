import Button from "../Form/Button"
import Search from "./Search"
import Conversations from "./Conversations"
import useLogout from "../../Hooks/Auth/useLogout"
import Title from "./Title"

const Siderbar = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="p-4 border-r border-slate-500 flex flex-col">
      <Search />
      <Title />
      <Conversations />
      <Button text="Logout" loading={loading} click={logout} />
    </div>
  )
}

export default Siderbar
