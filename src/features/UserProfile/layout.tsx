import PageMeta from "../../components/common/pagemeta/PageMeta";
import UserMetaCard from "./components/user-metacard";
import UserInfoCard from "./components/user-infocard";
import UserAddressCard from "./components/user-addresscard";

export default function UserProfiles() {
  return (
    <>
      <PageMeta title="User Profile | ReactKit" description="Manage your profile" />
      <div className="space-y-6">
        <UserMetaCard />
        <UserInfoCard />
        <UserAddressCard />
      </div>
    </>
  );
}