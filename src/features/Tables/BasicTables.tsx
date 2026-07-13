import PageBreadcrumb from "../../components/common/pagebread-crumb/PageBreadCrumb";
import ComponentCard from "../../components/common/component-card/ComponentCard";
import PageMeta from "../../components/common/pagemeta/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta title="Tables | ReactKit" description="ReactKit Tables" />
      <PageBreadcrumb pageTitle=" Table" />
      <div className="space-y-6">
        <ComponentCard title=" Table">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
