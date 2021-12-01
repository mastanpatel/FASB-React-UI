import React, { useState } from "react";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Form, Field } from "@progress/kendo-react-form";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import FormContainer from "./FormContainer";
import WacIO from "./WacIO";
import PezBonds from "./PezBonds";

function InputWizard() {
  return (
    <div>
      <WacIO />
      <PezBonds />
    </div>
  );
}

export default InputWizard;

// const emailRegex = new RegExp(/\S+@\S+\.\S+/);
// const emailValidator = (value) =>
//   emailRegex.test(value) ? "" : "Please enter a valid email.";

// const EmailInput = (fieldRenderProps) => {
//   const { validationMessage, visited, ...others } = fieldRenderProps;
//   return (
//     <div>
//       <Input {...others} />
//       {visited && validationMessage && (
//         <div className={"k-required"}>{validationMessage}</div>
//       )}
//     </div>
//   );
// };

// const InputWizard = (props) => {
//   const initialForm = {
//     firstName: "",
//     lastName: "",
//     dateOfBirth: new Date(),
//     email: "",
//     company: "",
//     userName: "",
//     password: "",
//     twoFactor: false,
//   };
//   const [showDialog, setShowDialog] = useState(false);

//   const toggleDialog = () => {
//     setShowDialog(!showDialog);
//   };

//   const handleSubmit = () => {
//     setShowDialog(!showDialog);
//   };

//   return (
//     <div className="container-fluid">
//       {showDialog && (
//         <Dialog onClose={toggleDialog}>
//           <p style={{ margin: "25px", textAlign: "center" }}>
//             The form is successfully submitted!
//           </p>
//           <DialogActionsBar>
//             <button className="k-button" onClick={toggleDialog}>
//               OK
//             </button>
//           </DialogActionsBar>
//         </Dialog>
//       )}
//       <div className="row my-4">
//         <FormContainer>
//           <Form
//             initialValues={initialForm}
//             onSubmit={handleSubmit}
//             render={(formRenderProps) => (
//               <form onSubmit={formRenderProps.onSubmit} className={"k-form"}>
//                 <fieldset>
//                   <legend>User Details</legend>
//                   <div>
//                     <Field
//                       name={"firstName"}
//                       component={Input}
//                       label={"First name"}
//                     />
//                   </div>
//                   <div>
//                     <Field
//                       name={"lastName"}
//                       component={Input}
//                       label={"Last name"}
//                     />
//                   </div>
//                   <div style={{ marginTop: "1rem" }}>
//                     <Field
//                       name={"dateOfBirth"}
//                       component={DatePicker}
//                       label={"Date of Birth"}
//                     />
//                   </div>
//                   <div>
//                     <Field
//                       name={"email"}
//                       type={"email"}
//                       component={EmailInput}
//                       label={"Email"}
//                       validator={emailValidator}
//                     />
//                   </div>
//                   <div>
//                     <Field
//                       name={"company"}
//                       component={Input}
//                       label={"Your Company"}
//                     />
//                   </div>
//                 </fieldset>

//                 <fieldset>
//                   <legend>Credentials</legend>
//                   <div>
//                     <Field
//                       name={"userName"}
//                       component={Input}
//                       label={"Username"}
//                       placeholder="Your username"
//                     />
//                   </div>
//                   <div>
//                     <Field
//                       name={"password"}
//                       component={Input}
//                       label={"Password"}
//                       placeholder="Your password"
//                     />
//                   </div>
//                   <div style={{ marginTop: "1rem" }}>
//                     <Field
//                       name={"twoFactor"}
//                       component={Checkbox}
//                       label={"Enable two-factor authentication"}
//                     />
//                   </div>
//                 </fieldset>

//                 <div className="text-right">
//                   <button
//                     type="button"
//                     className="k-button"
//                     onClick={formRenderProps.onFormReset}
//                   >
//                     Clear
//                   </button>{" "}
//                   &nbsp;
//                   <button
//                     type="submit"
//                     className="k-button k-primary"
//                     disabled={!formRenderProps.allowSubmit}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             )}
//           />
//         </FormContainer>
//       </div>
//     </div>
//   );
// };
