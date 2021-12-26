import React from "react";
import { Window } from "@progress/kendo-react-dialogs";

export function AddQuarter({ func }) {
  const [visible, setVisible] = React.useState(true);

  const toggleDialog = () => {
    setVisible(!visible);
    func(false);
  };

  return (
    <Window title={"Status"} onClose={toggleDialog} initialHeight={350}>
      <form className="k-form">
        <fieldset>
          <legend>User Details</legend>

          <label className="k-form-field">
            <span>First Name</span>
            <input className="k-textbox" placeholder="Your Name" />
          </label>
          <label className="k-form-field">
            <span>Last Name</span>
            <input className="k-textbox" placeholder="Your Last Name" />
          </label>
        </fieldset>

        <div className="text-right">
          <button type="button" className="k-button" onClick={toggleDialog}>
            Cancel
          </button>
          <button
            type="button"
            className="k-button k-primary"
            onClick={toggleDialog}
          >
            Submit
          </button>
        </div>
      </form>
    </Window>
  );
}
