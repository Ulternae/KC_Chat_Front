import { GroupsLoading } from "./Loading"
import { GroupsErrorView } from "./View/GroupsErrorView"
import { ViewFutureGroups } from "./View/ViewFutureGroups"
import { ViewGroups } from "./View/ViewGroups"
import { useOutletContext } from "react-router"

const Groups = () => {
  const { groups } = useOutletContext()
  const { groupsUser, loadingGroups, errorFetchGroups } = groups

  if (loadingGroups) return <GroupsLoading />
  if (errorFetchGroups.error) return <GroupsErrorView />
  if (!loadingGroups && groupsUser.length === 0) return <ViewFutureGroups />
  if (!loadingGroups && groupsUser.length > 0) return <ViewGroups />
}

export { Groups }