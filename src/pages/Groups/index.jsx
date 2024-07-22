import { useEffect } from "react"
import { useState } from "react"
import { GroupsLoading } from "./Loading"
import { ViewFutureGroups } from "./View/ViewFutureGroups"
import { ViewGroups } from "./View/ViewGroups"

const Groups = () => {
  const [ isLoading, setLoading ] = useState(true)
  const [ groups, setGroups ] = useState(['asd'])
  useEffect(() => {
    setTimeout(() => {
      // get in db the groups of user
      setLoading(false)
    }, 300)
  }, [])

  if (isLoading) return <GroupsLoading />
  if (groups.length === 0) return <ViewFutureGroups />
  return <ViewGroups />
}

export { Groups }