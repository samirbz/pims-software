import { getMembers } from "@/app/actions/memberActions"
import React from "react"

export default async function page() {
  const members = await getMembers()
  return <div>
    <ul>
        {members && members.map(member=>(
            <li key={member.id}>{member.name}</li>
        ))}
    </ul>
  </div>
}
