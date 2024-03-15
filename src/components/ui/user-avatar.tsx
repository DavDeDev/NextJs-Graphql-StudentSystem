
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import { User } from "@auth/core/types"


export function UserAvatar({ user, ...props }: { user: {name?: string, image?:string}, [key: string]: any }) {
  return (
    <Avatar {...props}>

      <AvatarFallback>
        <span className="sr-only">{user.name}</span>
        <Icons.user className="h-4 w-4" />
      </AvatarFallback>

    </Avatar>
  )
}
