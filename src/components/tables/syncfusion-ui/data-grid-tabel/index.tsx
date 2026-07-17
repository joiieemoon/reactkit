


import { closest, isNullOrUndefined } from "@syncfusion/ej2-base";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Filter,
  IFilter,
  VirtualScroll,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { RatingComponent } from "@syncfusion/ej2-react-inputs";
import { DataManager, Query, UrlAdaptor } from "@syncfusion/ej2-data";
 
// --- Syncfusion theme CSS (required — must be real imports, not inline <style> tags) ---
import "@syncfusion/ej2-base/styles/tailwind.css";
import "@syncfusion/ej2-buttons/styles/tailwind.css";
import "@syncfusion/ej2-calendars/styles/tailwind.css";
import "@syncfusion/ej2-dropdowns/styles/tailwind.css";
import "@syncfusion/ej2-inputs/styles/tailwind.css";
import "@syncfusion/ej2-navigations/styles/tailwind.css";
import "@syncfusion/ej2-popups/styles/tailwind.css";
import "@syncfusion/ej2-react-grids/styles/tailwind.css";
 
// --- Local overrides (must load AFTER the theme imports above) ---
import "./overview.css";
 
// Random user images array
const userImages = [
  "/images/user/user-01.jpg",
  "/images/user/user-02.jpg",
  "/images/user/user-03.jpg",
  "/images/user/user-04.jpg",
  "/images/user/user-05.jpg",
  "/images/user/user-06.jpg",
  "/images/user/user-07.jpg",
  "/images/user/user-08.jpg",
  "/images/user/user-09.jpg",
  "/images/user/user-10.jpg",
  "/images/user/user-11.jpg",
  "/images/user/user-12.jpg",
  "/images/user/user-13.jpg",
  "/images/user/user-14.jpg",
  "/images/user/user-15.jpg",
  "/images/user/user-16.jpg",
  "/images/user/user-17.jpg",
  "/images/user/user-18.jpg",
  "/images/user/user-19.jpg",
  "/images/user/user-20.jpg",
  "/images/user/user-21.jpg",
  "/images/user/user-22.jpg",
  "/images/user/user-23.jpg",
  "/images/user/user-24.jpg",
  "/images/user/user-25.jpg",
  "/images/user/user-26.jpg",
  "/images/user/user-27.jpg",
  "/images/user/user-28.jpg",
  "/images/user/user-29.jpg",
  "/images/user/user-30.jpg",
  "/images/user/user-31.jpg",
  "/images/user/user-33.jpg",
  "/images/user/user-34.jpg",
  "/images/user/user-35.jpg",
  "/images/user/user-36.jpg",
  "/images/user/user-37.jpg",
];
 
// Fallback avatar shown if a user image 404s, so broken-image icons never appear
const FALLBACK_AVATAR = "/images/user/user-01.jpg";
function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src.indexOf(FALLBACK_AVATAR) === -1) {
    img.src = FALLBACK_AVATAR;
  }
}
 
function statusTemplate(props): any {
  return (
    <div>
      {props.Status === "Active" ? (
        <div id="status" className="statustemp e-activecolor">
          <span className="statustxt e-activecolor">{props.Status}</span>
        </div>
      ) : (
        <div id="status" className="statustemp e-inactivecolor">
          <span className="statustxt e-inactivecolor">{props.Status}</span>
        </div>
      )}
    </div>
  );
}
function ratingTemplate(props): any {
  return (
    <div>
      <RatingComponent
        value={props.Rating}
        cssClass={"custom-rating"}
        readOnly={true}
      />
    </div>
  );
}
function progessTemplate(props): any {
  let percentage: number = props[props.column.field];
  if (percentage <= 20) {
    percentage = percentage + 30;
  }
  return (
    <div id="myProgress" className="pbar">
      {props.Status === "Inactive" ? (
        <div
          id="myBar"
          className="bar progressdisable"
          style={{ width: percentage + "%" }}
        >
          <div id="pbarlabel" className="barlabel">
            {percentage + "%"}
          </div>
        </div>
      ) : (
        <div id="myBar" className="bar" style={{ width: percentage + "%" }}>
          <div id="pbarlabel" className="barlabel">
            {percentage + "%"}
          </div>
        </div>
      )}
    </div>
  );
}
let loc = { width: "31px", height: "24px" };
function trustTemplate(props): any {
  var Trustworthiness =
    props.Trustworthiness == "Sufficient"
      ? "/grid/images/Sufficient.png"
      : props.Trustworthiness == "Insufficient"
        ? "/grid/images/Insufficient.png"
        : "/grid/images/Perfect.png";
  return (
    <div className="trust-wrapper">
      <img
        style={loc}
        src={Trustworthiness}
        alt={props.Trustworthiness}
        onError={(e) => {
          // hide broken-image icon instead of showing a blue placeholder box
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <span id="Trusttext">{props.Trustworthiness}</span>
    </div>
  );
}
 
function empTemplate(props): any {
  // Use EmployeeID as seed to pick a consistent random image per employee
  const imgIndex = (props.EmployeeID || 0) % userImages.length;
  const imgSrc = userImages[imgIndex];
  return (
    <div className="emp-template-wrapper">
      <div className="empimg">
        <img
          src={imgSrc}
          alt={props.Employees}
          className="emp-img"
          onError={handleImgError}
        />
      </div>
      <span id="Emptext">{props.Employees}</span>
    </div>
  );
}
function coltemplate(props): any {
  return (
    <div className="Mapimage">
      <img
        src="/grid/images/Map.png"
        className="e-image"
        alt=""
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />{" "}
      <span> </span>
      <span id="locationtext">{props.Location}</span>
    </div>
  );
}
function trustdetails(props): any {
  if (props.Trustworthiness === "Select All") {
    return <span></span>;
  }
  let loc = { width: "31px", height: "24px" };
  let Trustworthiness =
    props.Trustworthiness == "Sufficient"
      ? "/grid/images/Sufficient.png"
      : props.Trustworthiness == "Insufficient"
        ? "/grid/images/Insufficient.png"
        : "/grid/images/Perfect.png";
  return (
    <div className="trust-wrapper">
      <img
        style={loc}
        src={Trustworthiness}
        alt={props.Trustworthiness}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />{" "}
      <span id="Trusttext">{props.Trustworthiness}</span>
    </div>
  );
}
function ratingDetails(props): any {
  return (
    <RatingComponent
      value={props.Rating}
      cssClass={"custom-rating"}
      readOnly={true}
    />
  );
}
function statusdetails(props): any {
  if (props.Status === "Select All") {
    return <span>Select All</span>;
  }
  if (props.Status === "Active") {
    return (
      <div className="statustemp e-activecolor">
        <span className="statustxt e-activecolor">Active</span>
      </div>
    );
  }
  if (props.Status === "Inactive") {
    return (
      <div className="statustemp e-inactivecolor">
        <span className="statustxt e-inactivecolor">Inactive</span>
      </div>
    );
  }
}
 
function OverView() {
  let dReady: boolean = false;
  let dtTime: boolean = false;
  let isDataBound: boolean = false;
  let isDataChanged: boolean = true;
  let intervalFun: any;
  let clrIntervalFun: any;
  let clrIntervalFun1: any;
  let clrIntervalFun2: any;
  let dropSlectedIndex: number = null;
  let ddObj: DropDownListComponent;
  let gridInstance: GridComponent;
  let stTime: any;
  const ddlData: { [key: string]: Object }[] = [
    { text: "1,000 Rows and 11 Columns", value: "1000" },
    { text: "10,000 Rows and 11 Columns", value: "10000" },
    { text: "1,00,000 Rows and 11 Columns", value: "100000" },
  ];
 
  const fields: object = { text: "text", value: "value" };
 
  function onDataBound(): void {
    clearTimeout(clrIntervalFun);
    clearInterval(intervalFun);
    dtTime = true;
  }
  function onComplete(args: any): void {
    if (args.requestType === "filterchoicerequest") {
      if (
        args.filterModel.options.field === "Trustworthiness" ||
        args.filterModel.options.field === "Rating" ||
        args.filterModel.options.field === "Status"
      ) {
        var span =
          args.filterModel.dialogObj.element.querySelectorAll(
            ".e-selectall",
          )[0];
        if (!isNullOrUndefined(span)) {
          closest(span, ".e-ftrchk").classList.add("e-hide");
        }
      }
    }
  }
  const hostUrl: string = "https://services.syncfusion.com/react/production/";
  const data: DataManager = new DataManager({
    url: hostUrl + "api/UrlDataSource",
    adaptor: new UrlAdaptor(),
  });
  const query = new Query().addParams("dataCount", "10");
  function onChange(): void {
    ddObj.hidePopup();
    dropSlectedIndex = null;
    let index: number = ddObj.value as number;
    clearTimeout(clrIntervalFun2);
    clrIntervalFun2 = setTimeout(() => {
      isDataChanged = true;
      stTime = null;
      let contentElement: Element = gridInstance.contentModule.getPanel()
        .firstChild as Element;
      contentElement.scrollLeft = 0;
      contentElement.scrollTop = 0;
      gridInstance.pageSettings.currentPage = 1;
      stTime = performance.now();
      if (gridInstance.query.params.length > 1) {
        for (let i: number = 0; i < gridInstance.query.params.length; i++) {
          if (gridInstance.query.params[i].key === "dataCount") {
            gridInstance.query.params[i].value = index.toString();
            break;
          }
        }
      } else {
        gridInstance.query.params[0].value = index.toString();
      }
      gridInstance.setProperties({ dataSource: data });
    }, 100);
  }
  const check: IFilter = {
    type: "CheckBox",
  };
  const select: any = {
    persistSelection: true,
    type: "Multiple",
    checkboxOnly: true,
  };
  function onLoad(args: any): void {
    (document.getElementById("overviewgrid") as any).ej2_instances[0].on(
      "data-ready",
      () => {
        dReady = true;
        stTime = performance.now();
      },
    );
    var observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (dReady && stTime && isDataChanged) {
          let msgEle: Element = document.getElementById("msg") as Element;
          let val: any = (performance.now() - stTime).toFixed(0);
          stTime = null;
          dReady = false;
          dtTime = false;
          isDataChanged = false;
          msgEle.innerHTML =
            "Load Time: " + "<b>" + val + "</b>" + "<b>ms</b>";
          msgEle.classList.remove("e-hide");
        }
      });
    }); 
    observer.observe(document.getElementById("overviewgrid") as Node, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
  const gridFilter: any = {
    type: "Menu",
  };
  const status: any = {
    type: "CheckBox",
    itemTemplate: statusdetails,
  };
  const trust: any = {
    type: "CheckBox",
    itemTemplate: trustdetails,
  };
  const rating: any = {
    type: "CheckBox",
    itemTemplate: ratingDetails,
  };
 
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="grid-toolbar">
          <DropDownListComponent
            id="games"
            width="260"
            dataSource={ddlData}
            index={0}
            ref={(dropdownlist) => {
              ddObj = dropdownlist;
            }}
            fields={fields}
            change={onChange.bind(this)}
            placeholder="Select a Data Range"
            popupHeight="240px"
          />
          <span id="msg" className="e-hide"></span>
        </div>
 
        {/* Fixed-size wrapper: the grid renders as a single instance inside a
            constrained box so its width/height never depend on content */}
        <div className="grid-fixed-frame">
          <GridComponent
            id="overviewgrid"
            dataSource={data}
            loadingIndicator={{ indicatorType: "Shimmer" }}
            query={query}
            enableHover={false}
            enableVirtualization={true}
            rowHeight={38}
            height="400"
            width="100%"
            ref={(g) => {
              gridInstance = g;
            }}
            actionComplete={onComplete.bind(this)}
            load={onLoad.bind(this)}
            dataBound={onDataBound.bind(this)}
            filterSettings={gridFilter}
            allowFiltering={true}
            allowSorting={true}
            allowSelection={true}
            selectionSettings={select}
          >
            <ColumnsDirective>
              <ColumnDirective
                type="checkbox"
                allowSorting={false}
                allowFiltering={false}
                width="60"
              ></ColumnDirective>
              <ColumnDirective
                field="EmployeeID"
                visible={false}
                headerText="Employee ID"
                isPrimaryKey={true}
                width="130"
              ></ColumnDirective>
              <ColumnDirective
                field="Employees"
                headerText="Employee Name"
                width="230"
                clipMode="EllipsisWithTooltip"
                template={empTemplate}
              />
              <ColumnDirective
                field="Designation"
                headerText="Designation"
                width="170"
                clipMode="EllipsisWithTooltip"
              />
              <ColumnDirective
                field="Mail"
                headerText="Mail"
                width="230"
                clipMode="EllipsisWithTooltip"
              ></ColumnDirective>
              <ColumnDirective
                field="Location"
                headerText="Location"
                width="140"
                clipMode="EllipsisWithTooltip"
                template={coltemplate}
              ></ColumnDirective>
              <ColumnDirective
                field="Status"
                headerText="Status"
                template={statusTemplate}
                width="130"
              ></ColumnDirective>
              <ColumnDirective
                field="Trustworthiness"
                headerText="Trustworthiness"
                template={trustTemplate}
                width="160"
              ></ColumnDirective>
              <ColumnDirective
                field="Rating"
                headerText="Rating"
                template={ratingTemplate}
                width="220"
              />
              <ColumnDirective
                field="Software"
                allowFiltering={false}
                allowSorting={false}
                headerText="Software Proficiency"
                width="180"
                template={progessTemplate}
                format="C2"
              />
              <ColumnDirective
                field="CurrentSalary"
                headerText="Current Salary"
                width="160"
                format="C2"
              ></ColumnDirective>
              <ColumnDirective
                field="Address"
                headerText="Address"
                width="240"
                clipMode="EllipsisWithTooltip"
              ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Filter, VirtualScroll, Sort]} />
          </GridComponent>
        </div>
      </div>
    </div>
  );
}
export default OverView;
 






