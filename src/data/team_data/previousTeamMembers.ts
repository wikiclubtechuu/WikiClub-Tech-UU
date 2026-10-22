import { teamMembers } from './teamMembers';

// The 2025-26 archive uses the original photos in public/team/ (not the new team-uniform set).
export const previousTeamMembers = teamMembers.map((member) => ({
  ...member,
}));