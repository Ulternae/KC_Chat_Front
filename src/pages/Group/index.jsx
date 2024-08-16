import { useOutletContext, useParams } from "react-router"
import { GroupNotFound } from "./View/GroupNotFound"
import { GroupUser } from "./View/GroupUser"
import { Loading } from "./Loading"

const Group = () => {
  const { groups } = useOutletContext()
  const { groupsUser, loadingGroups } = groups
  const { group_id } = useParams()

  const currentGroup = groupsUser.find((g) => g.group_id === group_id)

  if (loadingGroups) return <Loading />
  if (!currentGroup) return <GroupNotFound />
  if (currentGroup) return <GroupUser currentGroup={currentGroup} />
}

export { Group }