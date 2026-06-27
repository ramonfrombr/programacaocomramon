import { MembershipTiersAdmin } from "@/app/(root)/(routes)/teacher/membership/_components/membership-tiers-admin";
import { TeacherMembershipPageHeader } from "@/app/(root)/(routes)/teacher/membership/_components/teacher-membership-page-header";

const TeacherMembershipPage = async () => {
  return (
    <div className="p-6 space-y-6">
      <TeacherMembershipPageHeader />
      <MembershipTiersAdmin />
    </div>
  );
};

export default TeacherMembershipPage;
