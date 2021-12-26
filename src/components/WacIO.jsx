import React from "react";

import { NumericTextBox } from "@progress/kendo-react-inputs";

import { DropDownList } from "@progress/kendo-react-dropdowns";

function WacIO() {
  const pricingmethods = ["swap", "yeild", "tresury"];
  const pricingscenarios = ["cpr", "preloss", "cdr", "serv"];
  return (
    <div>
      WAC IO
      <div className="col-xs-12 col-sm-7 example-col">
        <label>Pricing Method</label>
        <DropDownList data={pricingmethods} defaultValue="select method" />
      </div>
      <div className="col-12 col-md-6 example-col">
        <label>Pricing Input</label>
        <NumericTextBox defaultValue={123.45} format="c2" />
      </div>
      <div className="col-xs-12 col-sm-7 example-col">
        <label>Pricing Scenario</label>
        <DropDownList data={pricingscenarios} defaultValue="select scenario" />
      </div>
      <div>
        <button className="k-primary k-button">Save</button>
        <button className="k-primary k-button">Cancel</button>
      </div>
    </div>
  );
}

export default WacIO;
