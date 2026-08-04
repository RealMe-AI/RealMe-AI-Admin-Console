import { StatusBadge } from "@/components/shared/StatusBadge";
import { UserActions } from "./UserActions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/types/user";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => (
      <div className="flex items-center gap-2.5">
        <Avatar className="size-7">
          {info.row.original.avatar && (
            <AvatarImage
              src={info.row.original.avatar}
              alt={info.row.original.name}
            />
          )}
          <AvatarFallback className="text-[10px] font-medium bg-muted text-muted-foreground">
            {info.row.original.initials ||
              info.row.original.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-card-foreground">
            {info.row.original.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {info.row.original.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "country",
    header: "Location",
    cell: (info) => (
      <span className="text-sm text-card-foreground">
        {info.row.original.country}
      </span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: (info) => <StatusBadge status={info.row.original.plan} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => <StatusBadge status={info.row.original.status} />,
  },
  {
    accessorKey: "totalUsage",
    header: "Usage",
    cell: (info) => (
      <span className="text-sm text-card-foreground">
        {info.row.original.totalUsage.toLocaleString()}
      </span>
    ),
  },
  {
    id: "actions",
    cell: (info) => <UserActions user={info.row.original} />,
  },
];
