import { GroupStatus, GroupVisibilityLevel } from "@/enums/group.enums";

export type GroupCard = {
  id: string;
  name: string;
  visibilityLevel: GroupVisibilityLevel;
  status: GroupStatus;
  memberCount: number;
};
