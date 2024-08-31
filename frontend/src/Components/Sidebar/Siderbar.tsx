import Button from "../Form/Button"
import Search from "./Search"
import Conversations from "./Conversations"
import useLogout from "../../Hooks/useLogout"

const Siderbar = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="p-4 border-r border-slate-500 flex flex-col">
      <Search />
      <div className="divider px-3" />
      <Conversations />
      <Button text="Logout" loading={loading} click={logout} />
    </div>
  )
}

export default Siderbar
