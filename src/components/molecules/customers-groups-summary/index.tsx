import { sortBy } from "lodash"
import { Link } from "react-router-dom"
import { CustomerGroup } from "@medusajs/medusa"

interface P {
  groups: CustomerGroup[]
  withLinks?: boolean
}

function CustomersGroupsSummary(props: P) {
  const groups = sortBy(props.groups, "name")
  if (!groups.length) {
    return null
  }

  if (props.withLinks) {
    return (
      <div className="text-small flex flex-wrap gap-x-1 gap-y-0.5">
        {groups.map((g, i) => (
          <span key={g.id}>
            <Link
              to={`/a/customers/groups/${g.id}`}
              className="text-violet-60 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {g.name}
            </Link>
            {i < groups.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    )
  }

  const left = groups.length - 1
  const leadName = groups[0].name
  const allGroups = groups.map((g) => g.name).join(", ")

  return (
    <div title={allGroups} className="text-small">
      <span>{leadName}</span>
      {!!left && <span className="text-grey-40"> + {left} more</span>}
    </div>
  )
}

export default CustomersGroupsSummary
