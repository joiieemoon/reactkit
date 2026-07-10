import PageBreadcrumb from "../../components/common/pagebread-crumb/PageBreadCrumb";
import DefaultInputs from "./components/default-inputs/DefaultInputs";
import InputGroup from "./components/input-group/InputGroup";
import DropzoneComponent from "./components/drop-zone";
import CheckboxComponents from "./components/chechbox-components";

import RadioButtons from "./components/radio-buttons/RadioButtons";
import ToggleSwitch from "./components/toggle-switch/ToggleSwitch";
import FileInputExample from "./components/fileinput-example/FileInputExample";

import SelectInputs from "./components/select-inputs/SelectInputs";
import TextAreaInput from "./components/textarea-input/TextAreaInput";

import InputStates from "./components/input-states/InputStates";
import PageMeta from "../../components/common/pagemeta/PageMeta";

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Form Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
